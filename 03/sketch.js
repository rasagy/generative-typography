// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 3;
var currentLetter = 'C';
var currFrame = 1;
var cycle = false;

var darkness = 50;

var font;

var points, bounds, margin, w, h;

function preload() {
  font = loadFont('assets/Dosis-Light.ttf');
}

function setup() {
  createCanvas(600, 600);
  background(0,0,10);
  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  colorMode(HSL, 100);

  fill("#333");
  strokeWeight(1);
  traceLetter(currentLetter);
}

function draw() {
  background(10,10,10,20);
  
  var ratio = h/bounds.h;
  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);
  stroke(10, 20, 70);

  for (var i=0; i< points.length; i++) {
    var p = points[i];
    push();
    translate(p.x*ratio, p.y*ratio);
    rotate(random(360));
    var size = random(10);
    (random(2)>0.5)? ellipse(8,8,size,size) : ellipse(random(w), random(h), size*2, size*2);
    pop();
  }
  currFrame++;

  if(cycle == true && currFrame > 500) {
    var nextLetter = (currentLetter == 'Z')? 'A': String.fromCharCode(currentLetter.charCodeAt() + 1);
    traceLetter(nextLetter);
  }
  // darkness = (darkness>=10)? 0 : darkness+0.2;
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
    sampleFactor: 5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  currentLetter = letter;
  currFrame = 1;
}