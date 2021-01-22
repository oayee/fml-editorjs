import { matchSorter } from 'match-sorter';
import { make, Position } from './utils';

const menuHeight = 167;
const allowedTags = [
  { tag: 'customDiv', label: 'Custom Empty Block' },
  { tag: 'list', label: 'List' },
  { tag: 'checklist', label: 'Checklist' },
  { tag: 'textInput', label: 'Text Input' },
  { tag: 'textAreaInput', label: 'Text Area Input' },
  { tag: 'inputFile', label: 'Input File' },
];

const css = {
  wrapper: 'wrapper',
  wrapperHidden: 'wrapper--hidden',
  menu: 'wrapper__menu',
  menuItem: 'wrapper__menu-item',
  menuItemSelected: 'wrapper__menu-item--selected'
};

export default class Dropdown {
  private command = '';
  private selectedItem = 0;

  private readonly wrapper: HTMLElement;
  private readonly menu: HTMLElement;
  private tags = allowedTags;

  constructor(private readonly onDropdownSelect: Function, private readonly closeDropdown: Function) {
    this.menu = make('div', css.menu);
    this.wrapper = make('div', [css.wrapper, css.wrapperHidden]);
    this.wrapper.appendChild(this.menu);

    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  open(position: Position): void {
    document.addEventListener('keydown', this.keyDownHandler, { capture: true });
    this.setPosition(position);
    this.renderItems();
    this.element.classList.remove(css.wrapperHidden);
  }

  close(): void {
    this.element.classList.add(css.wrapperHidden);
    this.clearCommand();
    document.removeEventListener('keydown', this.keyDownHandler, { capture: true });
  }

  private renderItems(): void {
    this.menu.innerHTML = '';
    this.tags.forEach(tag => {
      const isSelected = this.tags.indexOf(tag) === this.selectedItem;
      const el = make('div', isSelected ? [css.menuItem, css.menuItemSelected] : css.menuItem, {}, {
        role: 'button',
        tabIndex: '0'
      });
      el.innerText = tag.label;
      el.addEventListener('click', () => this.onDropdownSelect(tag.tag));
      this.menu.appendChild(el);
    });
  }

  private setPosition(position: Position): void {
    this.wrapper.style.height = menuHeight + 'px';
    this.wrapper.style.top = position.y;
    this.wrapper.style.left = position.x;
    // this.wrapper.style.justifyContent = this.isMenuOutsideOfTopViewport(position.y) ? 'flex-end' : 'flex-start';
  }

  get element(): HTMLElement {
    return this.wrapper;
  }

  private isMenuOutsideOfTopViewport(y: string): boolean {
    return +y - menuHeight < 0;
  }

  private onCommandChange(prevCommand: string) {
    const command = this.command;
    if (prevCommand !== command) {
      this.tags = matchSorter(allowedTags, command, { keys: ['tag', 'label'] });
    }
    this.renderItems();
  }

  private clearCommand() {
    this.command = '';
    this.tags = allowedTags;
  }

  private keyDownHandler(e: KeyboardEvent) {
    if (this.element.classList.contains(css.wrapperHidden)) {
      return;
    }

    const selected = this.selectedItem;
    const command = this.command;
    const tags = this.tags;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (this.tags[selected]) {
          e.stopPropagation();
          this.onDropdownSelect(this.tags[selected].tag);
        } else {
          this.closeDropdown();
        }
        break;
      case 'Backspace':
        if (!command) this.closeDropdown();
        this.command = command.substring(0, command.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        const prevSelected = selected === 0 ? tags.length - 1 : selected - 1;
        this.selectedItem = prevSelected;
        this.setScroll(false);
        break;
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        e.stopPropagation();
        const nextSelected = selected === tags.length - 1 ? 0 : selected + 1;
        this.selectedItem = nextSelected;
        this.setScroll(true);
        break;
      default:
        if (e.key.length === 1) {
          this.command = this.command + e.key;
        }
        break;
    }

    this.onCommandChange(command);
  }

  private setScroll(isDown: boolean): void {
    const child = this.menu.children[this.selectedItem] as HTMLElement;
    const selectedOffsetTop = child.offsetTop;
    if (isDown) {
      if (selectedOffsetTop - this.menu.clientHeight > this.menu.scrollTop) {
        this.menu.scrollTop += child.clientHeight;
      } else if (this.selectedItem === 0) {
        this.menu.scrollTop = 0;
      }
    } else {
      if (this.menu.scrollTop > selectedOffsetTop) {
        this.menu.scrollTop -= child.clientHeight;
      } else if (this.selectedItem === this.tags.length - 1) {
        this.menu.scrollTop = this.menu.scrollHeight;
      }
    }
  }
}
