const ALPHABET = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"

export const loadData = async () => {
    const data = (await (await fetch("words.txt")).text()).toString(); 
    return data.split("\n");
}

export const parseWord = (wordInput: string) => {
    let inputWord = [...wordInput.toLowerCase()];
    inputWord = inputWord.map(letter => {return ALPHABET.includes(letter) ? letter : "_"});
    return inputWord.join("");
}
  
export const parseLetters = (usedLettersInput: string) =>{
    let inputString = [...usedLettersInput.toLowerCase()];
    inputString = inputString.filter(letter => ALPHABET.includes(letter));
    return inputString.join("");
}

export const matchWords = (word: string, bannedLetters: string, dictionary: string[]) => {
    let matchingWords = dictionary.filter(guess => guess.length == word.length);
    matchingWords = matchingWords.filter(guess => {
        for (let i = 0; i < word.length; ++i){
            if ((word[i] != '_' && word[i] != guess[i]) || 
                bannedLetters.includes(guess[i])) {
                return false;
            }
        }
        return true;
    });
    return matchingWords;
}

export const countLetters = (words: string[]) => {
    let letters: {[key: string]: number} = {};
    words.forEach(word => {
        [...word].forEach(letter => {
            if (letters[letter]){
                letters[letter] += 1;
            } else {
                letters[letter] = 1;
            }
        });
    });
    return letters;
}

export const get10BestLetters = (letters: {[key: string]: number}, word: string) => {
    let bestLetters = Object.keys(letters).filter(letter => !word.includes(letter));
    bestLetters.sort((a, b) => letters[b] - letters[a]);
    return bestLetters.slice(0, 10);
}
