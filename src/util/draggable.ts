import {addClass} from "./toggleClass";

export interface DragDetails {
  initialClientX: number;
  initialClientY: number;
  lastClientX: number;
  lastClientY: number;
  newClientX: number;
  newClientY: number;
}

export interface DragCallback {
  (el: Element, event: Event, details: DragDetails): void;
}

const moveElement = (elementToMove: HTMLElement) =>
function _moveElement(elementBeingDragged: HTMLElement, event: MouseEvent, details: DragDetails) {
  let { initialClientX, initialClientY, lastClientX, lastClientY, newClientX, newClientY } = details;

  let el = elementToMove;
  let bounds = el.getBoundingClientRect();
  let { left, top } = bounds;
  let dx = newClientX - lastClientX;
  let dy = newClientY - lastClientY;

  el.style.right = "auto";
  el.style.bottom = "auto";
  el.style.left = (left + dx) + 'px';
  el.style.top = (top + dy) + 'px';
};

export const dragActions = {
  move: moveElement,
};

export function draggable(el, callback: DragCallback) {
  let enabled = true;
  let isDragging = false;
  let initialClientX = 0, initialClientY = 0;
  let lastClientX = 0, lastClientY = 0;

  const mouseDownListener = (e: MouseEvent) => {
    if (!enabled) return;
    isDragging = true;

    lastClientX = initialClientX = e.clientX;
    lastClientY = initialClientY = e.clientY;

    const dragListener = (e) => {
      if (!enabled || !isDragging) return;
      e.preventDefault();
      let newClientX = e.clientX, newClientY = e.clientY;
      callback(el, e, { initialClientX, initialClientY, lastClientX, lastClientY, newClientX, newClientY });
      lastClientX = newClientX;
      lastClientY = newClientY;
    };

    const doneDragging = (e) => {
      isDragging = false;
      document.removeEventListener("mousemove", dragListener);
      document.removeEventListener("mouseup", doneDragging);
    };

    document.addEventListener("mousemove", dragListener);
    document.addEventListener("mouseup", doneDragging)
  };

  addClass("draggable")(el);
  el.addEventListener("mousedown", mouseDownListener);
  return () => el.removeEventListener("mousedown", mouseDownListener);
}
