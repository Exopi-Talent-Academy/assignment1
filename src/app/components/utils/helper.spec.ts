import { findColorForEachKey } from './helper';

describe('findColorForEachKey', () => {
  it('marks all green when words match', () => {
    const keyPad: {[k: string]: string} = {};
    const [matchedResult, keyPadColor] = findColorForEachKey('apple', 'apple', keyPad);
    expect(matchedResult).toEqual({0: 'green', 1: 'green', 2: 'green', 3: 'green', 4: 'green'});
    expect(keyPadColor).toEqual({a: 'green', p: 'green', l: 'green', e: 'green'});
  });

  it('marks all yellow when same letters different positions', () => {
    const keyPad: {[k: string]: string} = {};
    const [matchedResult, keyPadColor] = findColorForEachKey('abcde', 'eabcd', keyPad);
    expect(matchedResult).toEqual({0: 'yellow', 1: 'yellow', 2: 'yellow', 3: 'yellow', 4: 'yellow'});
    expect(keyPadColor).toEqual({a: 'yellow', b: 'yellow', c: 'yellow', d: 'yellow', e: 'yellow'});
  });

  it('handles duplicate letters without overcounting', () => {
    const keyPad: {[k: string]: string} = {};
    const [matchedResult, keyPadColor] = findColorForEachKey('aabbb', 'axxxx', keyPad);
    expect(matchedResult).toEqual({0: 'green', 1: 'black', 2: 'black', 3: 'black', 4: 'black'});
    expect(keyPadColor).toEqual({a: 'green', b: 'black'});
  });
});
