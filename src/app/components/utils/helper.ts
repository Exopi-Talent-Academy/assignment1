/**
 * Takes the current word, target word and the keyPadColor object and returns the matched result for each character in the current word and the updated keyPadColor object based on the comparison between the current word and the target word. The matched result indicates whether each character in the current word is correct and in the correct position (green), correct but in the wrong position (yellow), or incorrect (black). The keyPadColor object is updated to reflect the highest accuracy for each character across all attempts.
 * @param currentword
 * @param targetWord
 * @param keyPadColor
 * @returns An array containing the matched result for each character in the current word and the updated keyPadColor object.
 * @example
 * const keyPad: { [k: string]: string } = {};
 * const [matchedResult, keyPadColor] = findColorForEachKey('apple', 'apple', keyPad);
 * console.log(matchedResult); // { 0: 'green', 1: 'green', 2: 'green', 3: 'green', 4: 'green' }
 * console.log(keyPadColor); // { a: 'green', p: 'green', l: 'green', e: 'green' }
 */
export function findColorForEachKey(
  currentword: string,
  targetWord: string,
  keyPadColor: { [key: string]: string },
) {
  let matchedResult = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  };
  let currentWord = currentword.split('');
  let result = targetWord.split('');
  currentWord.forEach((char, index) => {
    if (currentWord[index] === result[index]) {
      keyPadColor[char] = 'green';
      keyPadColor = { ...keyPadColor };
      matchedResult[index] = 'green';
      currentWord[index] = '';
      result[index] = '';
    }
  });
  currentWord.forEach((char, index) => {
    if (result.includes(char)) {
      if (!char) {
        return;
      }
      matchedResult[index] = 'yellow';
      keyPadColor[char] = keyPadColor[char] ? keyPadColor[char] : 'yellow';
      keyPadColor = { ...keyPadColor };
      currentWord[index] = '';
      let indexInResult = result.indexOf(char);
      result[indexInResult] = '';
    } else {
      matchedResult[index] = 'black';
      keyPadColor[char] = keyPadColor[char] ? keyPadColor[char] : 'black';
      keyPadColor = { ...keyPadColor };
    }
  });

  return [matchedResult, keyPadColor];
}
