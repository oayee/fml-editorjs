export type Position = { x: string, y: string };

export const make = (tag: string, classes: string[] | string | null = null, styles: { [key: string]: string } = {}, attrs: { [key: string]: string | boolean } = {}) => {
  const el: HTMLElement = document.createElement(tag);

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
