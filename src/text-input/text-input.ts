import { BlockTool, BlockToolData } from '@editorjs/editorjs';
import { make } from '../div/utils';

export default class TextInput implements BlockTool {
  static get toolbox() {
    return {
      title: 'Text Input',
      icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M7.3335 2.66663H2.66683C2.31321 2.66663 1.97407 2.8071 1.72402 3.05715C1.47397 3.3072 1.3335 3.64634 1.3335 3.99996V13.3333C1.3335 13.6869 1.47397 14.0261 1.72402 14.2761C1.97407 14.5262 2.31321 14.6666 2.66683 14.6666H12.0002C12.3538 14.6666 12.6929 14.5262 12.943 14.2761C13.193 14.0261 13.3335 13.6869 13.3335 13.3333V8.66663" stroke="#ACAAB6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '<path d="M12.3335 1.66665C12.5987 1.40144 12.9584 1.25244 13.3335 1.25244C13.7086 1.25244 14.0683 1.40144 14.3335 1.66665C14.5987 1.93187 14.7477 2.29158 14.7477 2.66665C14.7477 3.04173 14.5987 3.40144 14.3335 3.66665L8.00016 9.99999L5.3335 10.6667L6.00016 7.99999L12.3335 1.66665Z" stroke="#ACAAB6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n' +
        '</svg>\n'
    };
  }

  constructor({ data }: any) {
    this.data = data || {};
  }

  private input: HTMLInputElement | undefined;
  private data: { [key: string]: string };

  render(): HTMLElement {
    this.input = make('input', '', {}, { 'type': 'text' });
    this.input.placeholder = this.data.text;
    return this.input;
  }

  save(block: HTMLInputElement): BlockToolData {
    return {
      text: block.value
    };
  }
}
