let Dictionary;
let WordFrequency;
let DataLoaded;

function preload(){
  DataLoaded = false;
  Dictionary = [];
  WordFrequency = {};
  LoadData();
  ThiccFont = loadFont('Fonts/Roboto-Black.ttf');
  ThinFont = loadFont('Fonts/Roboto-Thin.ttf');
  RegularFont = loadFont('Fonts/Roboto-Regular.ttf');
  loadFont('Fonts/Roboto-Black.ttf');
  loadFont('Fonts/Roboto-Thin.ttf');
  loadFont('Fonts/Roboto-Regular.ttf');
}

function setup(){
  SetUpUI();
  if (Device == "Laptop")
    createCanvas(windowWidth - 5, windowHeight - 5);
  else
    createCanvas(windowWidth + 1, windowHeight + 1);
  LoadAlphabet();
  frameRate(60);
}

function draw(){
  background(18);
  UpdateUI();
}
