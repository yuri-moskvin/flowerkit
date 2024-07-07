import ow from "ow";

/**
 * Gets the declension of a word depending on the number. Useful for Cyrillic words
 * @param num{Number} - source number
 * @param words{Array=} - array of three words with declension of one, two and few or zero
 * @return {string}
 * @example
 * // How to get right declension of Cyrillic word?
 * const words = [ "товар", "товара", "товаров" ]; // one, two, few or zero
 * getStrDeclination(2, words); // "товара"
 *
 */
const getStrDeclination = (num, words = []) => {

  ow(num, ow.number);
  ow(words, ow.array.validate(value => ({
    validator: value.length === 3,
    message: () => `The "words" array length must be 3: [ "one", "two", "few or zero" ]`
  })));

  const number = Math.abs(num);
  return words.length === 3 ? words[(number % 100 > 4 && number % 100 < 20) ? 2 : [ 2, 0, 1, 1, 1, 2 ][(number % 10 < 5) ? Math.abs(number) % 10 : 5]] : "";
};

export {
  getStrDeclination
};
