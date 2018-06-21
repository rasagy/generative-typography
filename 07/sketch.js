// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 7;
var currentLetter = 'G';
var currFrame = 1;
var cycle = false;

var font;

var points, bounds, margin, w, h;

var noiseSeed = 0;

function preload() {
  font = loadFont('assets/Orbitron-Black.ttf');
}

function setup() {
  createCanvas(600, 600);

  margin = width/20;
  w = width - margin*2;
  h = height - margin*8;

  colorMode(HSL, 100);
  ellipseMode(CENTER);

  background(60, 90, 5);
  fill(60,90,70);
  noStroke();
  traceLetter(currentLetter);
}

function draw() {
  
  var ratio = h/bounds.h;

  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  background(60, 90, 5, 5);
  // noFill();
  // stroke(0,0,50);
  // noStroke();
  
  for (var j=0; j< points.length; j++) {
    var p = points[j];
    var rectSize = noise(currFrame/500)*5+15;

    // fill((currFrame%1000)/10,90,70);

    // strokeWeight(3-scale)*5;
    // stroke(noise(noiseSeed+i/5)*100, 80, 60);
    // noFill();
    for(var i=0; i<100; i+=5) {
      var px=round(p.x*ratio/rectSize)*rectSize;
      var py=round(p.y*ratio/rectSize)*rectSize;
      rect(px, py, rectSize, rectSize);
      // ellipse(i+px-40, py+sin(((i+currFrame+px)%100)*PI*2/100)*10, 2, 2);
    }
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
    sampleFactor: 2,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  currentLetter = letter;
  currFrame = 1;
  background(18, 60, 25);
  switchColors();
}