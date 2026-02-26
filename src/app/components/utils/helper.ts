
export function findColorForEachKey(currentword: string, targetWord: string, keyPadColor: any) {
    let matchedResult = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: ''
    };
    let currentWord = currentword.split('');
    let result = targetWord.split('');
    currentWord.forEach((char, index) => {
      if(currentWord[index] === result[index]) {
        keyPadColor[char] = "green";
        keyPadColor = {...keyPadColor};
        matchedResult[index] = "green";
        currentWord[index] = '';
        result[index] = '';
      }
    })
    console.log('first ', matchedResult);
    currentWord.forEach((char, index) => {
      if(result.includes(char)) {
        if(!char){
          return;
        }
        matchedResult[index] = 'yellow';
        keyPadColor[char] = keyPadColor[char]? keyPadColor[char] : "yellow";
        keyPadColor = {...keyPadColor};
        currentWord[index] = '';
        let indexInResult = result.indexOf(char);
        result[indexInResult] = '';
      }else {
        matchedResult[index] = 'black';
        keyPadColor[char] = keyPadColor[char]? keyPadColor[char] :"black";
        keyPadColor = {...keyPadColor};
      }
      
    })


    return matchedResult;
  }