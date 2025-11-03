var video;
var vScale = 8;
let canvas;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
  
   // Snapshot button
  snapshotButton = createButton('Take Picture');
  snapshotButton.position((windowWidth - snapshotButton.width) / 2, (windowHeight + height) / 2 + 10);
  snapshotButton.mousePressed(takePicture);
}

function takePicture() {
  saveCanvas('snapshot', 'png');

}

function drawRegistrationMark(x, y) {
  stroke(0);
  strokeWeight(0.5);
  noFill();
  ellipse(x, y,10);
  line(x - 10, y, x + 10, y); // horizontal
  line(x, y - 10, x, y + 10); // vertical
}

function draw() {
  rectMode(CENTER);
  background(255);
  video.loadPixels();

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, vScale/1.3, 0);
      
//blendMode(MULTIPLY)
      noStroke();
      //Yellow
      fill(255, 242, 0, 100);
      rect(x * vScale + 50, y * vScale + 10, w, w);

      //Magenta
      fill(255, 0, 255, 100);
      rect(x * vScale + 30, y * vScale + 10, w, w);

      //Cyan
      fill(0, 170, 255, 100);
      rect(x * vScale + 10, y * vScale, w, w);
      //blendMode(BLEND)
    }
  }

  // White frame
  push()
  noFill();
  stroke(255);
  strokeWeight(60);
  rectMode(CORNERS);
  rect(0, 0, 640, 480);
  pop()

  // Draw 4 registration marks
  drawRegistrationMark(15, height /2); // top-left
  drawRegistrationMark(width/2, 15); // top-right
  drawRegistrationMark(width/2, height - 15); // bottom-left
  drawRegistrationMark(width - 15, height /2); // bottom-right
  
   //Cyan bottom
  fill(0, 174, 239, 100);;
  noStroke()
  strokeWeight(100);
  rect(width - 15, 50, 10);
  
  //Magenta bottom
  fill(236, 0, 140, 100);
  noStroke()
  strokeWeight(100);
  rect(width - 15, 60, 10);
  
  //Yellow bottom
  fill(255, 242, 0, 100);
  noStroke()
  strokeWeight(100);
  rect(width - 15, 70, 10);
  
  
   //Cyan top
  fill(0, 174, 239, 100);;
  noStroke()
  strokeWeight(100);
  rect(15, (height/2)+170, 10);
  
  //Magenta top
  fill(236, 0, 140, 100);
  noStroke()
  strokeWeight(100);
  rect(15, (height/2)+180, 10);
  
  //Yellow top
  fill(255, 242, 0, 100);
  noStroke()
  strokeWeight(100);
  rect(15, (height/2)+190, 10);
  
  // --- Crop marks 

  // Top-left (already present)
  stroke(0);
  strokeWeight(0.5);
  line(22, 30, 10, 30);   // horizontal line
  line(30, 10, 30, 22);   // vertical line

  // Top-right
  stroke(0);
  strokeWeight(0.5);
  line(width - 22, 30, width - 10, 30);   // horizontal line
  line(width - 30, 10, width - 30, 22);   // vertical line

  // Bottom-left
  stroke(0);
  strokeWeight(0.5);
  line(22, height - 30, 10, height - 30);   // horizontal line
  line(30, height - 10, 30, height - 22);   // vertical line

  // Bottom-right
  stroke(0);
  strokeWeight(0.5);
  line(width - 22, height - 30, width - 10, height - 30);   // horizontal line
  line(width - 30, height - 10, width - 30, height - 22);   // vertical line
  
   
 // --- Display title on bottom-left corner ---
  fill(0);
  noStroke();
  textSize(8);
  textAlign(LEFT, BOTTOM);
  text("print digital.fusion", 40, height - 5);

  // --- Display current date and time ---
  let now = new Date();
  let timestamp = now.toLocaleDateString() + " " + now.toLocaleTimeString();

  fill(0);
  noStroke();
  textSize(8);
  textAlign(BOTTOM);
  text(timestamp, width-120, height - 5);
 
}
function windowResized() {
  // Re-center canvas and button on window resize
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  snapshotButton.position((windowWidth - snapshotButton.width) / 2, (windowHeight + height) / 2 + 10);
}
