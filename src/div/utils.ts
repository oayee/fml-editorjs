export type Position = { x: string, y: string };

export const make = <T extends keyof HTMLElementTagNameMap>(tag: T, classes: string[] | string | null = null, styles: { [key: string]: string } = {}, attrs: { [key: string]: string | boolean } = {}): HTMLElementTagNameMap[T] => {
  const el: HTMLElementTagNameMap[T] = document.createElement(tag);

  if (Array.isArray(classes)) {
    el.classList.add(...classes);
  } else if (classes) {
    el.classList.add(classes);
  }

  for (const s in styles) {
    el.style[s] = styles[s];
  }

  for (const attr in attrs) {
    el[attr] = attrs[attr];
  }

  return el;
};

export const getCaretCoordinates = (): Position => {
  let x: string = '';
  let y: string = '';

  const selection = window.getSelection();

  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = '' + rect.left;
      y = '' + rect.top;
    }
  }
  return { x, y };
};

export function extractContentAfterCaret() {
  const input = document.activeElement;
  const selection = window.getSelection();
  const selectRange = selection!.getRangeAt(0);
  const range = selectRange.cloneRange();

  range.selectNodeContents(input as Node);
  range.setStart(selectRange.endContainer, selectRange.endOffset);

  return range.extractContents();
}

export function fragmentToHtml(fragment: any) {
  const tmpDiv = document.createElement('div');

  tmpDiv.appendChild(fragment);

  return tmpDiv.innerHTML;
}

export function getHTML(el: HTMLElement) {
  return el.innerHTML.replace('<br>', ' ').trim();
}

export function moveCaret(element: HTMLElement, toStart = false, offset: number | undefined = undefined) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);

  if (offset !== undefined) {
    range.setStart(element, offset);
    range.setEnd(element, offset);
  }

  range.collapse(toStart);

  selection!.removeAllRanges();
  selection!.addRange(range);
}
