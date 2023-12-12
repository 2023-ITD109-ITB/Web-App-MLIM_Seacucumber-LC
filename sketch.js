let video;
let label = "loading...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/fPt94lkdX/';

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
   // Create a responsive canvas
   let canvas = createCanvas(windowWidth, windowHeight);
   canvas.parent('sketch-container');
 
   // Create video capture with options for front and back camera
   const constraints = {
     video: {
       facingMode: 'environment' // 'user' for front camera, 'environment' for back camera
     }
   };
   video = createCapture(constraints);
   video.size(width, height);
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
  document.getElementById('label-result').innerText = 'This is ' + label;
  document.getElementById('emoji-result').innerText=''+getInfo();

  // Calculate responsive text size
  let textSizeResponsive = width / 20; // Adjust the factor as needed
  textSize(textSizeResponsive);
  textAlign(CENTER, BOTTOM); // Align text to the bottom
  fill(0); // Set text color to black
  text(label, width / 2, height - textSizeResponsive);

  // Calculate responsive emoji size and position

}

function getInfo() {
  // Pick an emoji, the "default" is train
  if (label == "Holothuria Scabra") {
    return "Phylum: Echinodermata \nOrder: Holothuroidea \nFamily: Holothuriidae \nGenus: Holothuria \nSpecies: Holothuria scabra \nPhysical appearance description: Brown, tan, yellow, reddish brown in color";
  } else if (label == "Apostichopus japonicus") {
    return "Phylum: Echinodermata \nClass: Holothuroidea \nOrder: Elasipodia \nFamily: Synallactida \nGenus: Apostichopus \nSpecies: Apostichopus japonicus \nPhysical appearance description: Irregular tube feet has highly branched feathery tentacles with soft and flexible elongated cylindrical body. Reddish brown in color.";
  } else if (label == "Royal cucumber") {
    return "Phylum: Echinodermata \nClass: Holothuroidea \nOrder: Asipodochirotida \nFamily: Stichpodidae \nGenus: Stichopus \nSpecies: Royal Cucumber \nPhysical appearance description: Uniform tube feet has 8 tentacles, large and robust tentacles with soft and flexible elongated worm like body. Pale in color with cream spots or patches.";
  } else if (label == "Holothuria Atra") {
    return "Phylum: Echinodermata \nOrder: Aspidochirotida \nGenus: Holothuria \nSpecies: Holothuria atra \nPhysical appearance description: Black, dark brown in color ";
  } else if (label == "Holothuria Tubolosa") {
    return "Phylum: Echinodermata \nOrder: Aspidochirotida \nGenus: Holothuria \nSpecies: Holothuria tubulosa \nPhysical appearance description: Dark brown/ black with white spots or markings. ";
  } else {
    return "Adjust your camera, I'm having a hard time identifying this one";
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
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(width, height);
}

function mouseClicked() {
  const constraints = video.getConstraints();
  const currentFacingMode = constraints.video.facingMode;

  constraints.video.facingMode = currentFacingMode === 'user' ? 'environment' : 'user';

  video.remove();
  video = createCapture(constraints);
  video.size(width, height);
  video.hide();

  classifyVideo();
}

window.onload = function() {
  setup();
};
