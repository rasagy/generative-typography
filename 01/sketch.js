// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 1;
var currentLetter = 'A';
var currFrame = 1;
var cycle = false;

var font;

function preload() {
  font = loadFont('assets/Exo-Black.ttf');
}

var points, bounds, margin, w, h;

function setup() {
  createCanvas(600, 600);
  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  stroke("#FCC8C2");
  strokeWeight(1);
  fill("#F5ECCD");
  traceLetter(currentLetter);
}

function draw() {
  background("#FF87AB");
  
  var ratio = h/bounds.h;
  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  for (var i=0; i< points.length && i<currFrame; i++) {
    var p = points[i];
    var size = sin(2*PI*i/points.length + millis()/1000)*20;
    ellipse(p.x*ratio, p.y*ratio, size, size);
  }
  currFrame++;

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