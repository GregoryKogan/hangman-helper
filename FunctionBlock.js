const ALPHABET = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"


const loadAllFonts = () => {
  ThiccFont = loadFont('Fonts/Roboto-Black.ttf');
  ThinFont = loadFont('Fonts/Roboto-Thin.ttf');
  RegularFont = loadFont('Fonts/Roboto-Regular.ttf');
}

const loadData = async () => {
  const data = (await (await fetch("WordDataBase.txt")).text()).toString();
  let wordLines = data.split("\n");
  wordLines.forEach(wordLine => {
    let wordData = wordLine.split(" ");
    Dictionary.push(wordData[0]);
    WordFrequency[wordData[0]] = wordData[1]; 
  });
}

const extractWord = () => {
  let inputWord = [...WordInput.value().toLowerCase()];
  inputWord = inputWord.map(letter => {return ALPHABET.includes(letter) ? letter : "_"});
  return inputWord;
}

const extractLetters = () =>{
  let inputString = [...UsedLettersInput.value().toLowerCase()];
  inputString = inputString.filter(letter => ALPHABET.includes(letter));
  return inputString;
}

const matchWords = (word, bannedLetters) => {
  let matchingWords = Dictionary.filter(guess => guess.length == word.length);
  matchingWords = matchingWords.filter(guess => {
    for (let i = 0; i < word.length; ++i){
      if (
        (word[i] != '_' && word[i] != guess[i]) || 
        bannedLetters.includes(guess[i])) {
        return false;
      }
    }
    return true;
  });
  return matchingWords;
}

const sortByFrequency = (matchingWords) => {
  matchingWords.sort((a, b) => WordFrequency[b] - WordFrequency[a]);
  return matchingWords;
}

const countLetters = (words) => {
  let letters = {};
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

const get10BestLetters = (letters) => {
  let bestLetters = [];
  for (let i = 0; i < 10; ++i){
    let bestLetter = Object.keys(letters).reduce((a, b) => letters[a] > letters[b] ? a : b);
    bestLetters.push(bestLetter);
    delete letters[bestLetter];
  }
  return bestLetters;
}

const submit = () => {
  let word = extractWord();
  let bannedLetters = extractLetters();
  let matchingWords = matchWords(word, bannedLetters);
  matchingWords = sortByFrequency(matchingWords);
  let bestFitLetters = get10BestLetters(countLetters(matchingWords));
  Output = [matchingWords, bestFitLetters];;
}
