// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

type Debounce = <F extends Fn>(fn: F, delay?: number, immediate?: boolean) => (...args: Parameters<F>) => void;

export const debounce: Debounce = (fn, delay = 500, immediate = false) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // Ensure the function is called with the right context (`this`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (this: any, ...args) {
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(this, args);
    };

    const shouldCallFn = immediate && !timeout;

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, delay);

    if (shouldCallFn) {
      fn.apply(this, args);
    }
  };
};

type ConvertDomRectToJson = (
  rect: DOMRect,
) => Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height' | 'x' | 'y'>;
export const convertDomRectToJson: ConvertDomRectToJson = rect => {
  // rect.toJSON() is not available in all browsers
  const { top, right, bottom, left, width, height, x, y } = rect;
  return { top, right, bottom, left, width, height, x, y };
};
