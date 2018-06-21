// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 2;
var currentLetter = 'B';
var currFrame = 1;
var cycle = false;

var level = 0;

var font;

function preload() {
  font = loadFont('assets/MerriweatherSans-ExtraBold.ttf');
}

var points, bounds, margin, w, h;

function setup() {
  createCanvas(600, 600);
  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  colorMode(HSL, 100);

  stroke("#D1ECF9");
  strokeWeight(1);
  // fill("#F5ECCD");
  traceLetter(currentLetter);
}

function draw() {
  background("#98C6F5");
  
  var ratio = h/bounds.h;
  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  for (var i=0; i< points.length; i++) {
    var p = points[i];
    var size;
    // var size = sin(2*PI*i/points.length + millis()/1000)*20;
    if(p.y*(-1)<level-5) {
      size = 3;
      fill(64, 100, 97);
    } else if (p.y*(-1)<level){
      size = (5-level-p.y)*4;
      fill(map(size, 0, 20, 64, 64), map(size, 0, 20, 60, 95), map(size, 0, 20, 100, 90));
    } else {
      fill("#ffffff");
      size = 1;
    }
    
    // fill(p.x*100/bounds.h, 80, 80);
    // fill("#0033ff");
    var ex = (size>3)? p.x*ratio + random(4)-2 : p.x*ratio;
    ellipse(ex, p.y*ratio, size, size);
  }
  currFrame++;
  level+=bounds.h/200;
  if(level > bounds.h+10) {
    level = 0;
  }

  if(cycle == true && currFrame > 500) {
    var nextLetter = (currentLetter == 'Z')? 'A': String.fromCharCode(currentLetter.charCodeAt() + 1);
    traceLetter(nextLetter);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    save(dayID+"-"+currentLetter+"-"+currFrame+".png");
  } else if ((key >= 'A' && key <= 'Z') || (key >= '0' && key <= '9')) {
    //console.log(key);
    traceLetter(key);
  }
}

function traceLetter(letter) {
  points = font.textToPoints(letter, 0, 0, 40, {
    sampleFactor: 1,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  console.log(currFrame);
  currentLetter = letter;
  currFrame = 1;
}