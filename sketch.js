let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  // Create a responsive canvas
  let canvas = createCanvas(640, 520);
  canvas.parent('sketch-container');
  
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(255); // Set background color to white
  image(video, 0, 0, width, height);

  // Update HTML elements with the results
  document.getElementById('label-result').innerText = 'Label: ' + label;
  document.getElementById('emoji-result').innerText = 'Emoji: ' + getEmoji();

  // Calculate responsive text size
  let textSizeResponsive = width / 20; // Adjust the factor as needed
  textSize(textSizeResponsive);
  textAlign(CENTER, BOTTOM); // Align text to the bottom
  fill(0); // Set text color to black
  text(label, width / 2, height - textSizeResponsive);

  // Calculate responsive emoji size and position

}

function getEmoji() {
  // Pick an emoji, the "default" is train
  if (label == "Rainbow") {
    return "🌈";
  } else if (label == "Unicorn") {
    return "🦄";
  } else if (label == "Ukulele") {
    return "🎸";
  } else {
    return "🚂";
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}

window.onload = function() {
  setup();
};
