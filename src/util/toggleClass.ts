export const hasClass = classname => el => !!new RegExp(`\\b${classname}\\b`).exec(el.className);

export const addClass = classname => el => (el.className = el.className + ' ' + classname);

export const removeClass = classname => el =>
  (el.className = el.className.replace(new RegExp(`\\b${classname}\\b`, 'g'), ''));

export const toggleClass = classname => el => {
  if (hasClass(classname)(el)) removeClass(classname)(el);
  else addClass(classname)(el);
};
