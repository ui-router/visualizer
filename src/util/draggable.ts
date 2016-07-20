import {addClass} from "./toggleClass";

export function draggable(el) {
  let enabled = true;
  let isDragging = false;
  let mx = 0, my = 0;
  let x = 0, y = 0;

  el.addEventListener("mousedown", (e) => {
    if (!enabled) return;
    isDragging = true;
    mx = e.pageX;
    my = e.pageY;
    x = el.offsetLeft;
    y = el.offsetTop;
  });

  el.addEventListener("mousemove", (e) => {
    if (!enabled || !isDragging) return;
    e.preventDefault();
    el.style.right = "auto";
    el.style.bottom = "auto";
    el.style.left = (x + (e.pageX - mx)) + 'px';
    el.style.top = (y + (e.pageY - my)) + 'px';
  });

  el.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  addClass("draggable")(el);
}
