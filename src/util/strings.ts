/**
 * Returns a string shortened to a maximum length
 *
 * If the string is already less than the `max` length, return the string.
 * Else return the string, shortened to `max - 3` and append three dots ("...").
 *
 * @param max the maximum length of the string to return
 * @param str the input string
 */
export function maxLength(max: number, str: string) {
  if (str.length <= max) return str;
  return str.substr(0, max - 3) + '...';
}

function stringifyPattern(value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'object' && typeof value.then === 'function') return '[Promise]';
  return value;
}

export function stringify(o: Object) {
  var seen: any[] = [];

  function format(val: any) {
    if (typeof val === 'object') {
      if (seen.indexOf(val) !== -1) return '[circular ref]';
      seen.push(val);
    }
    return stringifyPattern(val);
  }

  return JSON.stringify(o, (key, val) => format(val)).replace(/\\"/g, '"');
}
