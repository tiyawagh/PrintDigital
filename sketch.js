var video;
var vScale = 12;
var vScaleSlider;
var lastVScale = vScale;
var canvas;
var snapshotButton;

function setup() {
  canvas = createCanvas(640, 480);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  pixelDensity(1);

  // Create slider for vScale (range 4 to 20, starting at 12)
  vScaleSlider = createSlider(4, 20, vScale, 1);
  vScaleSlider.position((windowWidth - width) / 2 + 10, (windowHeight - height) / 2 + height + 10);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();

  // Snapshot button
  snapshotButton = createButton('Take Picture');
  snapshotButton.position(vScaleSlider.x + vScaleSlider.width + 10, vScaleSlider.y);
  snapshotButton.mousePressed(takePicture);
}

function takePicture() {
  saveCanvas('snapshot', 'png');
}

function draw() {
  background(255);

  // Update vScale from slider
  let newVScale = vScaleSlider.value();

  if (newVScale !== lastVScale) {
    vScale = newVScale;
    video.size(width / vScale, height / vScale);
    lastVScale = newVScale;
  }

  video.loadPixels();

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width)) * 4;
      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 255, vScale / 1.2, 0);

      blendMode(MULTIPLY);
      noStroke();
      fill(255, 242, 0, 120);
      rectMode(CENTER);
      rect(x * vScale, y * vScale, w, w);

      noStroke();
      fill(236, 0, 140, 120);
      rectMode(CENTER);
      rect(x * vScale + 2, y * vScale + 6, w, w);

      noStroke();
      fill(0, 174, 239, 120);
      rectMode(CENTER);
      rect(x * vScale + 10, y * vScale + 1, w, w);

      blendMode(BLEND);
    }
  }

  addGrain(0.1);
}

// Add noise/grain 
function addGrain(amount) {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let grain = random(-amount * 255, amount * 255);
    pixels[i] = pixels[i] + grain;
    pixels[i + 1] = pixels[i + 1] + grain;
    pixels[i + 2] = pixels[i + 2] + grain;
  }
  updatePixels();
}

function windowResized() {
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  vScaleSlider.position((windowWidth - width) / 2 + 10, (windowHeight - height) / 2 + height + 10);
  snapshotButton.position(vScaleSlider.x + vScaleSlider.width + 10, vScaleSlider.y);
}
