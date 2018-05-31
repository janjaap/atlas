/**
 * Extracts the number between parentheses from a header title.
 *
 * Format: 'Header (14)'
 * Extracts: 14
 *
 * @param {string} text The header title.
 * @return {number} The number from the header title.
 */
const getCountFromHeader = (text) =>
  parseInt(text.match(/\(([0-9.,]*)\)/)[1].replace('.', ''), 10);

export default {
  getCountFromHeader
};
