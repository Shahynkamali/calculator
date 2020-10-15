/*!
 * Get all of an element's parent elements up the DOM tree
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
// eslint-disable-next-line func-names
const getParents = function (elem: any, selector: any) {
  // Setup parents array
  const parents: any = [];

  // Get matching parent elements
  while (elem && elem !== document) {
    // If using a selector, add matching parents to array
    // Otherwise, add all parents
    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem);
      }
    } else {
      parents.push(elem);
    }

    // Jump to the next parent node
    // eslint-disable-next-line no-param-reassign
    elem = elem.parentNode;
  }

  return parents;
};

export default getParents;
