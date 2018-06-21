// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 5;
var currentLetter = 'E';
var currFrame = 1;
var cycle = false;

var font;

var points, bounds, margin, w, h;

var noiseSeed = 0;

function preload() {
  font = loadFont('assets/Dosis-ExtraBold.ttf');
}

function setup() {
  createCanvas(600, 600);

  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  colorMode(HSL, 100);
  ellipseMode(CENTER);

  background(80, 0, 90);
  fill(33,100,99);
  strokeWeight(1);
  traceLetter(currentLetter);
}

function draw() {
  var scale = sin((currFrame%100)*PI/100);
  var ellipseWidth = 15*(scale+0.05)+10;
  var ellipseHeight = 4*(1.05-scale)+8;
  
  background(80, 0, map(scale, 0, 1, 90, 100), 10);

  // (currFrame%100)? stretch(scale): stretch(-1);
  
  var ratio = h/bounds.h;

  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  for (var i=0; i< points.length; i++) {
    var p = points[i];

    strokeWeight(3-scale)*5;
    stroke(noise(noiseSeed+i/5)*100, 80, 60);
    noFill();

    ellipse(p.x*ratio, p.y*ratio, ellipseWidth, ellipseHeight);
  }
  currFrame++;

  if(cycle == true && currFrame > 500) {
    var nextLetter = (currentLetter == 'Z')? 'A': String.fromCharCode(currentLetter.charCodeAt() + 1);
    traceLetter(nextLetter);
  }

  if(currFrame%400 == 0) switchColors();
}

function switchColors() {
  noiseSeed = parseInt(random(10));
}

function keyPressed() {
  if (keyCode === 32) {
    save(dayID+"-"+currentLetter+"-"+currFrame+".png");
  } else if ((key >= 'A' && key <= 'Z') || (key >= '0' && key <= '9')) {
    traceLetter(key);
  }
}

function traceLetter(letter) {
  points = font.textToPoints(letter, 0, 0, 40, {
    sampleFactor: 0.25,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  currentLetter = letter;
  currFrame = 1;
  background(80, 0, 90);
  switchColors();
}