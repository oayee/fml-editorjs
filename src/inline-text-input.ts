import { API, InlineTool } from '@editorjs/editorjs';
import TextInput from './text-input/text-input';

export default class InlineTextInput implements InlineTool {
  static get isInline() {
    return true;
  }

  constructor({ api }: any) {
    this.button = null;
    this.api = api;
  }

  button: HTMLButtonElement | null;
  api: API;

  checkState(): boolean {
    return false;
  }

  render(): HTMLElement {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: Range) {
    const data = { text: range.extractContents().textContent };
    const textInput = new TextInput({ data });
    const inputTag = textInput.render();
    range.insertNode(inputTag);

    this.api.selection.expandToTag(inputTag);
    inputTag.focus();
  }
}
