import { API, BlockTool, HTMLPasteEvent } from '@editorjs/editorjs';
import Dropdown from './dropdown';
import { getCaretCoordinates, make } from './utils';

export default class Div implements BlockTool {
  static get DEFAULT_PLACEHOLDER() {
    return '';
  }

  private _element: HTMLElement;
  private div: HTMLElement | undefined;
  private innerHTMLBackup: string = '';
  private _data: { [key: string]: string };

  private readonly _CSS: { [key: string]: string };
  private readonly _placeholder: string;
  private readonly _preserveBlank: boolean;
  private readonly readOnly: boolean;
  private readonly api: API;
  private readonly _dropdown: Dropdown;

  constructor({ data, config, api, readOnly }: any) {
    this.api = api;
    this.readOnly = readOnly;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-paragraph'
    };

    if (!this.readOnly) {
      this.onKeyUp = this.onKeyUp.bind(this);
      this.closeDropdown = this.closeDropdown.bind(this);
      this.onDropdownSelect = this.onDropdownSelect.bind(this);
    }

    this._dropdown = new Dropdown(this.onDropdownSelect, this.closeDropdown);
    this._placeholder = config.placeholder ? config.placeholder : Div.DEFAULT_PLACEHOLDER;
    this._data = {};
    this._element = this.drawView();
    this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;

    this.data = data;
  }

  onKeyUp(e: KeyboardEvent): void {
    if (e.code !== 'Backspace' && e.code !== 'Delete' && e.code !== 'Slash') {
      return;
    }

    if (e.code === 'Slash') {
      this.openDropdown();
    }

    const { textContent } = this.div as HTMLElement;

    if (textContent === '') {
      this.div!.innerHTML = '';
    }
  }

  private closeDropdown() {
    this._dropdown.close();
    document.removeEventListener('click', this.closeDropdown, { capture: true });
  }

  private openDropdown() {
    this.innerHTMLBackup = this.div!.innerHTML.substring(0, this.div!.innerHTML.length - 1);
    this._dropdown.open(getCaretCoordinates());
    document.addEventListener('click', this.closeDropdown, { capture: true });
  }

  onDropdownSelect(tag: string) {
    this.closeDropdown();
    this.div!.innerHTML = this.innerHTMLBackup;
    const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
    this.api.blocks.insert(tag);
    this.api.caret.setToBlock(currentBlockIndex + 1);
    if (!this.div!.innerHTML) {
      this.api.blocks.delete(currentBlockIndex);
    }
  }

  private drawView(): HTMLElement {
    this._element = make('div', 'outer-wrapper');
    this.div = make('div', [this._CSS.wrapper, this._CSS.block], {}, { contentEditable: 'false' });

    this.div.dataset.placeholder = this.api.i18n.t(this._placeholder);

    if (!this.readOnly) {
      this.div.contentEditable = 'true';
      this.div.addEventListener('keyup', this.onKeyUp);
    }

    this._element.appendChild(this.div);
    this._element.appendChild(this._dropdown.element);

    return this._element;
  }

  render(): HTMLElement {
    return this._element;
  }

  merge(data: { [key: string]: string }) {
    this.data = {
      text: this.data.text + data.text
    };
  }

  validate(savedData: { [key: string]: string }): boolean {
    return !(savedData.text.trim() === '' && !this._preserveBlank);
  }

  save(toolsContent: HTMLElement) {
    const div = toolsContent.querySelector('.' + this._CSS.wrapper);
    return {
      text: div!.innerHTML
    };
  }

  onPaste(event: HTMLPasteEvent) {
    this.data = {
      text: event.detail.data.innerHTML
    };
  }

  static get conversionConfig() {
    return {
      export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
      import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      }
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  get data() {
    this._data.text = this.div!.innerHTML;

    return this._data;
  }

  set data(data) {
    this._data = data || {};

    this.div!.innerHTML = this._data.text || '';
  }

  static get pasteConfig() {
    return {
      tags: ['P']
    };
  }

  static get toolbox() {
    return {
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M1.87534 10.3112L1.0309 13.9556C1.00177 14.0888 1.00277 14.2269 1.03382 14.3597C1.06488 14.4925 1.1252 14.6166 1.21039 14.7231C1.29558 14.8296 1.40349 14.9157 1.52622 14.9752C1.64895 15.0346 1.78342 15.0659 1.91979 15.0667C1.98333 15.0731 2.04736 15.0731 2.1109 15.0667L5.77756 14.2223L12.8176 7.20894L8.88868 3.28894L1.87534 10.3112Z" fill="#ACAAB6"/>\n' +
        '<path d="M15.0311 3.69778L12.4089 1.07556C12.2365 0.904029 12.0032 0.807739 11.76 0.807739C11.5168 0.807739 11.2835 0.904029 11.1111 1.07556L9.65332 2.53333L13.5778 6.45778L15.0355 5C15.1209 4.91426 15.1884 4.81253 15.2344 4.70065C15.2803 4.58877 15.3038 4.46892 15.3034 4.34797C15.3029 4.22702 15.2787 4.10733 15.232 3.99576C15.1852 3.8842 15.117 3.78294 15.0311 3.69778Z" fill="#ACAAB6"/>\n' +
        '</svg>\n',
      title: 'Text'
    };
  }
}
