// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 5;
var currentLetter = 'E';
var currFrame = 1;
var cycle = false;

var font;

var points, bounds, margin, w, h;

var lines = [];

function preload() {
  font = loadFont('assets/Infinity.ttf');
}

function setup() {
  createCanvas(600, 600);

  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  colorMode(HSL, 100);

  background(67,100,99);
  fill(33,100,99);
  strokeWeight(1);
  traceLetter(currentLetter);
}

function draw() {
  var scale = sin((currFrame%100)*PI/100);
  
  background(80, 70, map(scale, 0, 1, 90, 85), 30);

  (currFrame%100)? stretch(scale): stretch(-1);
  
  var ratio = h/bounds.h;

  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  for (var i=0; i< points.length; i++) {
    var p = points[i];
    var diff = (p.x-bounds.w/2)/bounds.w; //-0.5 to 0.5
    
    noStroke();
    fill(80, 30, map(scale, 0, 1, 30, 60));

    ellipse(p.x*ratio*(scale+0.25), p.y*ratio, 5, 5);
  }
  currFrame++;

  if(cycle == true && currFrame > 500) {
    var nextLetter = (currentLetter == 'Z')? 'A': String.fromCharCode(currentLetter.charCodeAt() + 1);
    traceLetter(nextLetter);
  }
}

function stretch(s) {
  if(s>0) {
    for(var a = 0; a<lines.length; a++) {
      line(lines[a][0], lines[a][1], lines[a][0]+s*10, lines[a][1]+s*10);
    }
  } else {
    lines = [];
    for(var a = 0; a<5; a++) {
      lines.push([random(w), random(h)]);
    }
    // console.log(lines);
  } 
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
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  currentLetter = letter;
  currFrame = 1;
  background(67,100,99);
}