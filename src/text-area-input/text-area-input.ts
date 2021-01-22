import { BlockTool, BlockToolData } from '@editorjs/editorjs';

export default class TextAreaInput implements BlockTool {

  static get toolbox() {
    return {
      title: 'Text Area Input',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<g clip-path="url(#clip0)">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3H1.5C1.36739 3 1.24021 3.05268 1.14645 3.14645C1.05268 3.24021 1 3.36739 1 3.5V12.5C1 12.6326 1.05268 12.7598 1.14645 12.8536C1.24021 12.9473 1.36739 13 1.5 13H14.5C14.6326 13 14.7598 12.9473 14.8536 12.8536C14.9473 12.7598 15 12.6326 15 12.5V3.5C15 3.36739 14.9473 3.24021 14.8536 3.14645C14.7598 3.05268 14.6326 3 14.5 3ZM1.5 2C1.10218 2 0.720644 2.15804 0.43934 2.43934C0.158035 2.72064 0 3.10218 0 3.5L0 12.5C0 12.8978 0.158035 13.2794 0.43934 13.5607C0.720644 13.842 1.10218 14 1.5 14H14.5C14.8978 14 15.2794 13.842 15.5607 13.5607C15.842 13.2794 16 12.8978 16 12.5V3.5C16 3.10218 15.842 2.72064 15.5607 2.43934C15.2794 2.15804 14.8978 2 14.5 2H1.5Z" fill="#ACAAB6"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M5 8C5 7.86739 5.05268 7.74021 5.14645 7.64645C5.24021 7.55268 5.36739 7.5 5.5 7.5H12.5C12.6326 7.5 12.7598 7.55268 12.8536 7.64645C12.9473 7.74021 13 7.86739 13 8C13 8.13261 12.9473 8.25979 12.8536 8.35355C12.7598 8.44732 12.6326 8.5 12.5 8.5H5.5C5.36739 8.5 5.24021 8.44732 5.14645 8.35355C5.05268 8.25979 5 8.13261 5 8ZM5 5.5C5 5.36739 5.05268 5.24021 5.14645 5.14645C5.24021 5.05268 5.36739 5 5.5 5H12.5C12.6326 5 12.7598 5.05268 12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5C13 5.63261 12.9473 5.75979 12.8536 5.85355C12.7598 5.94732 12.6326 6 12.5 6H5.5C5.36739 6 5.24021 5.94732 5.14645 5.85355C5.05268 5.75979 5 5.63261 5 5.5ZM5 10.5C5 10.3674 5.05268 10.2402 5.14645 10.1464C5.24021 10.0527 5.36739 10 5.5 10H12.5C12.6326 10 12.7598 10.0527 12.8536 10.1464C12.9473 10.2402 13 10.3674 13 10.5C13 10.6326 12.9473 10.7598 12.8536 10.8536C12.7598 10.9473 12.6326 11 12.5 11H5.5C5.36739 11 5.24021 10.9473 5.14645 10.8536C5.05268 10.7598 5 10.6326 5 10.5Z" fill="#ACAAB6"/>\n' +
        '<path d="M3.5 6C3.77614 6 4 5.77614 4 5.5C4 5.22386 3.77614 5 3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6Z" fill="#ACAAB6"/>\n' +
        '<path d="M3.5 8.5C3.77614 8.5 4 8.27614 4 8C4 7.72386 3.77614 7.5 3.5 7.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5Z" fill="#ACAAB6"/>\n' +
        '<path d="M3.5 11C3.77614 11 4 10.7761 4 10.5C4 10.2239 3.77614 10 3.5 10C3.22386 10 3 10.2239 3 10.5C3 10.7761 3.22386 11 3.5 11Z" fill="#ACAAB6"/>\n' +
        '</g>\n' +
        '<defs>\n' +
        '<clipPath id="clip0">\n' +
        '<rect width="16" height="16" fill="white"/>\n' +
        '</clipPath>\n' +
        '</defs>\n' +
        '</svg>\n'
    };
  }

  render(): HTMLElement {
    return document.createElement('textarea');
  }

  save(block: HTMLInputElement): BlockToolData {
    return {
      text: block.value
    };
  }
}
