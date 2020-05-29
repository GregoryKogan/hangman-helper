let Alphabet;
async function LoadData(){
  console.log("LOADING DATA...");
  const Response = await fetch("WordDataBase.txt");
  let Data = await Response.text();
  Data.toString();
  let Dict = Data.split("\n", 1000000);
  for (let i = 0; i < Dict.length; ++i){
    let WordInfo = Dict[i].split(" ", 10);
    Dictionary.push(WordInfo[0]);
    let WordScore = 0;
    for (let j = 1; j < WordInfo.length; ++j){
      if (parseInt(WordInfo[j], 10))
        WordScore += parseInt(WordInfo[j], 10);
    }
    WordFrequency[WordInfo[0]] = WordScore;
  }
  console.log("DATA LOADED");
  DataLoaded = true;
}

function SubmitData(){
  LockScreen();
  console.log("Data submitted");
  //Считываем значеия полей ввода
  let Word = WordInput.value().toLowerCase();
  let Letters = UsedLettersInput.value().toLowerCase().split(", ", 1000);
  //Дополняем массив использованных букв теми, что используются в слове
  console.log("Building baned letters array");
  for (let i = 0; i < Word.length; ++i){
    if (Word[i] != '_'){
      let Flag = false;
      for (let j = 0; j < Letters.length; ++j){
        if (Letters[i] == Word[i])
          Flag = true;
      }
      if (!Flag)
        Letters.push(Word[i]);
    }
  }
  //Находим все слова удовлетворяющие такому сочетанию и положению букв
  console.log("Searching fitting words");
  let MatchingWords = [];
  const WordLength = Word.length;
  for (let i = 0; i < Dictionary.length; ++i){
    if (Dictionary[i].length == WordLength){
      let Flag = true;
      for (let j = 0; j < WordLength; ++j){
        if (Word[j] != '_' && Word[j] != Dictionary[i][j])
          Flag = false;
      }
      if (Flag){
        let SecondFlag = true;
        for (let j = 0; j < Letters.length; ++j){
          for (let k = 0; k < WordLength; ++k){
            if (Dictionary[i][k] == Letters[j] && Word[k] == '_')
              SecondFlag = false;
          }
        }
        if (SecondFlag)
          MatchingWords.push(Dictionary[i]);
      }
    }
  }
  console.log("There're " + MatchingWords.length + " fitting words");
  //Сортируем полученные слова по популярности (сортировка выбором)
  console.log("Sorting fitting words");
  let SortedResult = [];
  let it = 0;
  while(it < 100 && MatchingWords.length > 0){
    let MaxFreq = -Infinity;
    let BestWordIndex = 0;
    for (let i = 0; i < MatchingWords.length; ++i){
      if (WordFrequency[MatchingWords[i]] > MaxFreq){
        MaxFreq = WordFrequency[MatchingWords[i]];
        BestWordIndex = i;
      }
    }
    if (MatchingWords[BestWordIndex] != "")
      SortedResult.push(MatchingWords[BestWordIndex]);
    MatchingWords.splice(BestWordIndex, 1);
    ++it;
  }
  MatchingWords = SortedResult;
  //Получаем список букв, которые стоит попробовать с коэффициентом частоты
  console.log("Getting popular letters");
  let LetterCounter = {};
  for (let i = 0; i < MatchingWords.length; ++i){
    for (let j = 0; j < MatchingWords[i].length; ++j){
      if (Word[j] == '_'){
        if (LetterCounter[MatchingWords[i][j]])
          LetterCounter[MatchingWords[i][j]]++;
        else
          LetterCounter[MatchingWords[i][j]] = 1;
      }
    }
  }
  //Берем 10 самых частотных букв
  console.log("Sorting popular letters");
  BestFitLetters = [];
  for (let i = 0; i < 10; ++i){
    let MaxFreq = -Infinity;
    let BestLetter = '';
    for (let j = 0; j < Alphabet.length; ++j){
      if (LetterCounter[Alphabet[j]] > MaxFreq){
        let Flag = true;
        for (let k = 0; k < BestFitLetters.length; ++k){
          if (BestFitLetters[k] == Alphabet[j])
            Flag = false;
        }
        if (Flag){
          MaxFreq = LetterCounter[Alphabet[j]];
          BestLetter = Alphabet[j];
        }
      }
    }
    if (BestLetter != '')
      BestFitLetters.push(BestLetter);
  }
  //Выводим в консоль результат
  console.log(MatchingWords);
  console.log(BestFitLetters);
  let Response = [MatchingWords, BestFitLetters];
  Output = Response;
}

function LoadAlphabet(){
  Alphabet = ['а', 'б', 'в', 'г', 'д', 'е',
              'ё', 'ж', 'з', 'и', 'й', 'к',
              'л', 'м', 'н', 'о', 'п', 'р',
              'с', 'т', 'у', 'ф', 'х', 'ц',
              'ч', 'ш', 'щ', 'ъ', 'ы', 'ь',
              'э', 'ю', 'я'];
}
