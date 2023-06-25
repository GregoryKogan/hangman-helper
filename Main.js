let Dictionary = [];
let WordFrequency = {};


function preload(){
  loadData();
  loadAllFonts();
}

function setup(){
  SetUpUI();
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(18);
  UpdateUI();
}
