import { extractContentAfterCaret, fragmentToHtml, make, getHTML, moveCaret } from '../div/utils';
import { API, BlockTool } from '@editorjs/editorjs';

export default class Radio implements BlockTool {
  static get isReadOnlySupported() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return {
      icon: '<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-2.394a5.106 5.106 0 1 0 0-10.212 5.106 5.106 0 0 0 0 10.212zm-.675-4.665l2.708-2.708 1.392 1.392-2.708 2.708-1.392 1.391-2.971-2.971L5.245 6.36l1.58 1.58z"/></svg>',
      title: 'Radio',
    };
  }

  // static get conversionConfig() {
  //   return {
  //     export: (data: any) => {
  //       return data.items.map(({ text }: any) => text).join('. ');
  //     },
  //     import: (string: string) => {
  //       return {
  //         items: [
  //           {
  //             text: string,
  //             checked: false,
  //           },
  //         ],
  //       };
  //     },
  //   };
  // }

  _elements: any;
  readOnly: boolean;
  api: API;
  data: any;
  groupName: string;


  constructor({ data, config, api, readOnly }: any) {
    this._elements = {
      wrapper: null,
      items: [],
    };
    this.readOnly = readOnly;
    this.api = api;
    this.data = data || {};
    this.groupName = 'group' + this.api.blocks.getCurrentBlockIndex();
  }

  render() {
    this._elements.wrapper = make('div', [this.CSS.baseBlock, this.CSS.wrapper]);
    if (!this.data.items) {
      this.data.items = [
        {
          text: '',
          checked: false,
        },
      ];
    }

    this.data.items.forEach((item: any) => {
      const newItem = this.createChecklistItem(item);

      this._elements.wrapper.appendChild(newItem);
    });

    if (this.readOnly) {
      return this._elements.wrapper;
    }

    this._elements.wrapper.addEventListener('keydown', (event: any) => {
      const [ENTER, BACKSPACE] = [13, 8]; // key codes

      switch (event.keyCode) {
        case ENTER:
          this.enterPressed(event);
          break;
        case BACKSPACE:
          this.backspace(event);
          break;
      }
    }, false);

    this._elements.wrapper.addEventListener('click', (event: any) => {
      this.toggleCheckbox(event);
    });

    return this._elements.wrapper;
  }

  save() {
    let items = this.items.map((itemEl: any) => {
      const el = this.getItemInput(itemEl);
      const input = itemEl.querySelector(`.${ this.CSS.checkbox }`);

      return {
        text: getHTML(el),
        checked: input.checked,
      };
    });

    items = items.filter(item => item.text.trim().length !== 0);

    return {
      items,
    };
  }

  validate(savedData: any) {
    return !!savedData.items.length;
  }

  toggleCheckbox(event: any) {
    const checkListItem = event.target.closest(`.${ this.CSS.item }`);
    const checkbox = checkListItem.querySelector(`.${ this.CSS.checkbox }`);

    // if (checkbox.contains(event.target)) {
    //   checkListItem.classList.toggle(this.CSS.itemChecked);
    // }
  }

  createChecklistItem(item: any = {}) {
    const checkListItem = make('div', this.CSS.item);
    const radio = make('input', this.CSS.checkbox, {}, { name: this.groupName, type: 'radio' });
    // const checkbox = make('span', this.CSS.checkbox);
    const textField = make('div', this.CSS.textField, {}, {
      innerHTML: item.text ? item.text : '',
      contentEditable: !this.readOnly + '',
    });

    if (item.checked) {
      checkListItem.classList.add(this.CSS.itemChecked);
    }

    // checkListItem.appendChild(checkbox);
    checkListItem.appendChild(radio);
    checkListItem.appendChild(textField);

    return checkListItem;
  }

  enterPressed(event: any) {
    event.preventDefault();

    const items = this.items;
    const currentItem = document.activeElement!.closest(`.${ this.CSS.item }`);
    const currentItemIndex = items.indexOf(currentItem);
    const isLastItem = currentItemIndex === items.length - 1;

    if (isLastItem) {
      const currentItemText = getHTML(this.getItemInput(currentItem));
      const isEmptyItem = currentItemText.length === 0;

      if (isEmptyItem) {
        const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();

        currentItem!.remove();

        this.api.blocks.insert();
        this.api.caret.setToBlock(currentBlockIndex + 1);

        return;
      }
    }

    const fragmentAfterCaret = extractContentAfterCaret();
    const htmlAfterCaret = fragmentToHtml(fragmentAfterCaret);

    const newItem = this.createChecklistItem({
      text: htmlAfterCaret,
      checked: false,
    });

    this._elements.wrapper.insertBefore(newItem, currentItem!.nextSibling);

    moveCaret(this.getItemInput(newItem), true);
  }

  backspace(event: any) {
    const currentItem = event.target.closest(`.${ this.CSS.item }`);
    const currentIndex = this.items.indexOf(currentItem);
    const prevItem = this.items[currentIndex - 1];

    if (!prevItem) {
      return;
    }

    const selection = window.getSelection();
    const caretAtTheBeginning = selection!.focusOffset === 0;

    if (!caretAtTheBeginning) {
      return;
    }

    event.preventDefault();

    const fragmentAfterCaret = extractContentAfterCaret();
    const prevItemInput = this.getItemInput(prevItem);
    const prevItemChildNodesLength = prevItemInput.childNodes.length;

    prevItemInput.appendChild(fragmentAfterCaret);

    moveCaret(prevItemInput, undefined, prevItemChildNodesLength);

    currentItem.remove();
  }

  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: 'cdx-radio',
      item: 'cdx-radio__item',
      itemChecked: 'cdx-radio__item--checked',
      checkbox: 'cdx-radio__item-checkbox',
      textField: 'cdx-radio__item-text',
    };
  }

  get items() {
    return Array.from(this._elements.wrapper.querySelectorAll(`.${ this.CSS.item }`));
  }

  getItemInput(el: any) {
    return el.querySelector(`.${ this.CSS.textField }`);
  }
}
