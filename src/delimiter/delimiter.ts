import { BlockTool, BlockToolData } from '@editorjs/editorjs';

export default class Delimiter implements BlockTool {
  render(): HTMLElement {
    const div = document.createElement('DIV');

    div.classList.add('delimiter');

    return div;
  }

  static get toolbox() {
    return {
      icon: `<svg width="19" height="4" viewBox="0 0 19 4" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 0H7a1.25 1.25 0 1 1 0 2.5H1.25a1.25 1.25 0 1 1 0-2.5zM11 0h5.75a1.25 1.25 0 0 1 0 2.5H11A1.25 1.25 0 0 1 11 0z"/></svg>`,
      title: 'Delimiter'
    };
  }

  save(block: HTMLElement): BlockToolData {
    return;
  }
}
