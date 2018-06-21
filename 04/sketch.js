// 36 Days of Generative Type //
//      By Rasagy Sharma      //

var dayID = 4;
var currentLetter = 'D';
var currFrame = 1;
var cycle = false;

var font;

var points, bounds, margin, w, h;

function preload() {
  font = loadFont('assets/Montserrat-ThinItalic.ttf');
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
  background(67,100,99,5);
  
  var ratio = h/bounds.h;
  
  makeGrid();

  translate(margin+(w-bounds.w*ratio)/2-bounds.x*ratio, margin*4-bounds.y*ratio);

  for (var i=0; i< points.length; i++) {
    var p = points[i];
    push();
    translate(p.x*ratio, p.y*ratio);
    var n = noise(currFrame/200+p.x/10+p.y/10);
    //rotate(noise(currFrame/1000+p.x/100+p.y/100)*45+45);
    rotate(n-0.5);

    // var size = 5+n*30;
    var size = 30;
    stroke(0, 80, 80, n*150-25);
    strokeWeight(n*2);
    line(-size,-size,size,size);
    // line(-20,-20,20,20);
    // rotate(random(360));
    // var size = random(10);
    // (random(2)>0.5)? ellipse(8,8,size,size) : ellipse(random(w), random(h), size*2, size*2);
    pop();
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
    traceLetter(key);
  }
}

function traceLetter(letter) {
  points = font.textToPoints(letter, 0, 0, 40, {
    sampleFactor: 1,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(letter, 0, 0, 40);
  currentLetter = letter;
  currFrame = 1;
  background(67,100,99);
}

function makeGrid() {
  for(var a = 0; a<width; a+=5) {
    stroke(0,80,90,20);
    strokeWeight(0.5);
    line(a-width/2,height/2-a,a+width/2,height*3/2-a);
  }
}