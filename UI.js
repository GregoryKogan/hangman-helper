let Device;
let Os;

let WordInput;
let UsedLettersInput;
let SubmitButton;
let ClearButton;
let FullScreenButton;

let Output;

function SetUpUI(){
  DetectDevice();

  ButtonColor = color(50);

  WordInput = createInput("Гид__э_ек___с__нция");
  WordInput.style('font-size', '23px');
  WordInput.style('background-color', ButtonColor);
  WordInput.style('color', 'grey');
  WordInput.style('font-family', 'Roboto-Regular');

  UsedLettersInput = createInput("з, б, в, у, ш, ж");
  UsedLettersInput.style('font-size', '23px');
  UsedLettersInput.style('background-color', ButtonColor);
  UsedLettersInput.style('color', 'grey');
  UsedLettersInput.style('font-family', 'Roboto-Regular');

  SubmitButton = createButton("Подтвердить");
  SubmitButton.style('font-size', '20px');
  SubmitButton.style('background-color', ButtonColor);
  SubmitButton.style('color', 'white');
  SubmitButton.style('font-family', 'Roboto-Thin');
  SubmitButton.mousePressed(SubmitData);

  ClearButton = createButton("Очистить");
  ClearButton.style('font-size', '20px');
  ClearButton.style('background-color', ButtonColor);
  ClearButton.style('color', 'white');
  ClearButton.style('font-family', 'Roboto-Thin');
  ClearButton.mousePressed(Clear);

  FullScreenButton = createButton("<>");
  FullScreenButton.style('font-size', '20px');
  FullScreenButton.style('background-color', ButtonColor);
  FullScreenButton.style('color', 'white');
  FullScreenButton.style('font-family', 'Roboto-Regular');
  FullScreenButton.mousePressed(FSManagement);
}

function UpdateUI(){
  UpdateUIPos();
  push();
  fill(255);
  textFont(RegularFont);
  textSize(14);
  textAlign(LEFT);
  text("G.Koganovskiy 2020 (v1.0)", 10, windowHeight - 10);
  pop();
  if (WordInput.value() == "")
    MakeWhite();
  if (Device == "Laptop"){
    let Width = 0;
    if (windowWidth < 1052)
      Width = 1052;
    else
      Width = windowWidth;
    push();
    stroke(246, 202, 9);
    strokeWeight(3);
    line(0, 62.5, windowWidth, 62.5);
    line(0, 178.5, windowWidth, 178.5);
    pop();
    push();
    fill(255);
    textSize(20);
    textAlign(RIGHT);
    textFont(ThiccFont);
    text("Ваше слово", Width / 2 - Width / 6 - 10, 95);
    text("Использованные буквы", Width / 2 - Width / 6 - 10, 155);
    textAlign(LEFT);
    text("Длина: " + WordInput.value().length,  Width / 2 + Width / 6 + 20, 95);
    text("Букв: " + Math.floor((UsedLettersInput.value().length + 2) / 3),  Width / 2 + Width / 6 + 20, 155);
    if (Output){
      if (Output[0].length > 0){
        let ColumnWidth = (130 / 7) * (Output[0][0].length + 3);
        let Columns = (Width - 40) / ColumnWidth - 1;
        textAlign(LEFT);
        textFont(RegularFont);
        text("Возможно это слово -", 20, 320);
        textFont(ThiccFont);
        for (let i = 0; i < Output[0].length && i < Columns * 5; ++i){
          push();
          fill(255);
          textSize(20);
          textAlign(LEFT);
          text((i + 1) + ") " + CapitalFirst(Output[0][i]), 20 + Math.floor(i / 5) * ColumnWidth, 350 + (i % 5) * 30);
          pop();
        }
      }
      if (Output[1].length > 0){
        textFont(RegularFont);
        text("Попробуйте буквы:", 20, 530);
        textFont(ThiccFont);
        for (let i = 0; i < Output[1].length - 1; ++i){
          text(Output[1][i].toUpperCase() + ", ", 220 + i * 30, 530);
        }
        text(Output[1][Output[1].length - 1].toUpperCase(), 220 + (Output[1].length - 1) * 30, 530);
      }
    }
    pop();
  }
  else{
    if (Os != "IOS"){
      push();
      stroke(246, 202, 9);
      strokeWeight(3);
      line(10, 20, 10, 240);
      line(windowWidth - 10, 20, windowWidth - 10, 240);
      pop();
    }
    Width = windowWidth;
    push();
    fill(255);
    textSize(20);
    textAlign(LEFT);
    textFont(ThiccFont);
    text("Ваше слово", 22, 45);
    text("Использованные буквы", 22, 135);
    textAlign(RIGHT);
    textSize(20);
    textFont(RegularFont);
    text("Длина: " + WordInput.value().length, Width - 22, 45);
    text("Букв: " + Math.floor((UsedLettersInput.value().length + 2) / 3),  Width - 22, 135);
      textAlign(LEFT);
      textFont(RegularFont);
      text("Возможно это слово -", 20, 370);
      if (Output && Output[0].length > 0){
        let ColumnWidth;
        if (Output[0].length == 1)
          ColumnWidth = 5;
        else
          ColumnWidth = (130 / 7) * (Output[0][0].length);
        let Columns = (Width / ColumnWidth);
        let Rows = (windowHeight - 400) / ((423) / 14);
        textFont(ThiccFont);
        textSize(23);
        Columns = Math.floor(Columns);
        Rows = Math.floor(Rows);
        for (let i = 0; i < Output[0].length && i < Columns * Rows; ++i){
          push();
          fill(255);
          textSize(20);
          textAlign(LEFT);
          text(CapitalFirst(Output[0][i]), 22 + Math.floor(i / Rows) * ColumnWidth, 400 + (i % Rows) * 30);
          pop();
        }
      }
      textFont(RegularFont);
      textAlign(LEFT);
      text("Попробуйте буквы:", 20, 300);
      if (Output && Output[1].length > 0){
        textFont(ThiccFont);
        for (let i = 0; i < Output[1].length - 1; ++i){
          text(Output[1][i].toUpperCase() + ", ", 22 + i * 30, 330);
        }
        text(Output[1][Output[1].length - 1].toUpperCase(), 22 + (Output[1].length - 1) * 30, 330);
      }
    }
}

function Clear(){
  WordInput.value("");
  UsedLettersInput.value("");
  MakeWhite();
  LockScreen();
  Output = undefined;
}

function MakeWhite(){
  WordInput.style('color', 'white');
  UsedLettersInput.style('color', 'white');
}

function CapitalFirst(Word){
  let FirstLetter = Word[0];
  FirstLetter = FirstLetter.toUpperCase();
  let NewWord = "";
  NewWord += FirstLetter;
  for (let i = 1; i < Word.length; ++i)
    NewWord += Word[i];
  return NewWord;
}

function DetectDevice(){
  if (min(displayWidth / 4.29, displayHeight / 4.29) >= 150)
    Device = "Laptop";
  else
    Device = "Phone";
  if (navigator.userAgent.indexOf("like Mac") != -1){
    Os = "IOS";
    Device = "Phone";
  }
}

function windowResized(){
  if (Device == "Laptop")
    resizeCanvas(windowWidth - 5, windowHeight - 5);
  else
    resizeCanvas(windowWidth + 1, windowHeight + 1);
  UpdateUI();
}

function FSManagement(){
  if (fullscreen()){
    FullScreenButton.html("<>");
  }
  else{
    FullScreenButton.html("><");
  }
  fullscreen(!fullscreen());
}

function LockScreen(){
  if (Os != "IOS"){
    screen.orientation.lock("portrait")
    .then(function() {
      console.log("Device orientation locked");
    })
    .catch(function(error) {
      console.log("Unable to lock screen on this device");
    });
  }
}

function UpdateUIPos(){
  if (Device == "Laptop"){
    let Width = 0;
    if (windowWidth < 1052)
      Width = 1052;
    else
      Width = windowWidth;
    WordInput.position(Width / 2 - Width / 6, 70);
    WordInput.size(Width / 3, 30);

    UsedLettersInput.position(Width / 2 - Width / 6, 130);
    UsedLettersInput.size(Width / 3, 30);

    SubmitButton.position(Width / 2 - Width / 14, 190);
    SubmitButton.size(Width / 7, 35);

    ClearButton.position(Width / 2 - Width / 18, 25);
    ClearButton.size(Width / 9, 30);

    FullScreenButton.position(Width - 45 - 10, windowHeight - 40);
    FullScreenButton.size(45, 30);
  }
  else{
    let Width = windowWidth;

    WordInput.position(21, 60);
    WordInput.size(Width - 50, 30);

    UsedLettersInput.position(21, 150);
    UsedLettersInput.size(Width - 50, 30);

    SubmitButton.position(21, 200);
    SubmitButton.size((Width - 50) / 2 - 10, 35);

    ClearButton.position(Width - ((Width - 50) / 2 - 10) - 21, 200);
    ClearButton.size((Width - 50) / 2 - 10, 35);

    FullScreenButton.position(Width - 45 - 10, windowHeight - 40);
    FullScreenButton.size(45, 30);
  }
}
