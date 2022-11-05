let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
let greenandblueImage = removeRed(robot);
let flippedImage = flipColors(robot);


robot.show();
greenandblueImage.show();
flippedImage.show();
 


//removeRed(imageInput: loaded image): blue and green image
function removeRed(imageInput){
   //Creates a copy of the input image to be edited, RR stands for remove red
  let imageCopyRR = imageInput.copy();

  //Two for loops that will iterate through the pixel grid of the picture
  for (let x = 0; x < imageCopyRR.width; ++x){
    for (let y = 0; y < imageCopyRR.height; ++y){
      //bg stands for blue green, this line returns an array of the intensity of red, green, and blue pixels at x,y coordinate
      let gbArray = imageCopyRR.getPixel(x, y); 
      //this line sets red pixels at x,y coordinate to 0 to remove them- while leaving blue and green the same
      imageCopyRR.setPixel(x, y, [0, gbArray[0], gbArray[0]]); 
    }
  }

  return imageCopyRR;
}

//flipColors(imageInput: loaded image): flipped image
function flipColors(imageInput){
  //Creates a copy of the image input to be edited by the function, FC stands for flip colors
  let imageCopyFC = imageInput.copy();

    //Two for loops that will iterate through the pixel grid of the picture
  for (let x = 0; x < imageCopyFC.width; ++x){
    for (let y = 0; y < imageCopyFC.height; ++y){

      //fc stands for flip colors, this line returns an array of the intensity of red, green, and blue pixels at x,y coordinate
      let fcArray = imageCopyFC.getPixel(x, y);


      //Takes the mean(average) of green(element 1) and blue(element 2) for red(element 0)
      let m0 = (fcArray[1] + fcArray[2])/2;
      //Takes the mean(average) of red(element 0) and blue(element 2) for green(element 1)
      let m1 = (fcArray[0] + fcArray[2])/2;
      //Takes the mean(average) of red(element 0) and green(element 1) for blue(element 2)
      let m2 = (fcArray[0] + fcArray[1])/2;

      //Sets red to m0
      imageCopyFC.setPixel(x, y, [m0, m1, m2]);
    }
  }
  
  return imageCopyFC;
}

//mapLine(img: Image,lineNo: number, func: (p: Pixel) => Pixel) : void
function mapLine(imageInput, lineNo, func) {
  for (let x = 0; x < imageInput.width; ++x) {
    imageInput.setPixel(x, lineNo, func(imageInput.getPixel(x, lineNo)));
  }
}


// imageMap(img: Image, func: (p: Pixel) => Pixel) : Image
function imageMap(imageInput, func) {
  let imageCopyMap = imageInput.copy();
 
  for (let y = 0; y < imageCopyMap.height; ++y) {
    mapLine(imageCopyMap, y, func); 
  } 
  return imageCopyMap;
}



// mapToGB(img : Image) : Image
function mapToGB(imageInput) {
  return imageMap(imageInput, mapToGBPixel);
}

function mapToGBPixel(fcArray) {
  return [0, fcArray[0], fcArray[0]];
}

// mapToFlipColors(img : Image) : Image
function mapFlipColors(imageInput) {
  return imageMap(imageInput, mapFlipColorsPixel);
}

function mapFlipColorsPixel(fcArray) {
  //Takes the mean(average) of green(element 1) and blue(element 2) for red(element 0)
  let m0 = (fcArray[1] + fcArray[2])/2;
  //Takes the mean(average) of red(element 0) and blue(element 2) for green(element 1)
  let m1 = (fcArray[0] + fcArray[2])/2;
  //Takes the mean(average) of red(element 0) and green(element 1) for blue(element 2)
  let m2 = (fcArray[0] + fcArray[1])/2;

  return [fcArray[m0], fcArray[m1], fcArray[m2]];
}

test('removeRed function definition is correct', function() {
const white = lib220.createImage(10, 10, [1,1,1]);
removeRed(white).getPixel(0,0);
// Checks that code runs. Need to use assert to check properties.
});

test('No red in removeRed result', function() {
// Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
const white = lib220.createImage(10, 10, [1,1,1]);
// Get the result of the function.
const shouldBeBG = removeRed(white);
// Read the center pixel.
const pixelValue = shouldBeBG.getPixel(5, 5);
// The red channel should be 0.
assert(pixelValue[0] === 0);
// The green channel should be unchanged.
assert(pixelValue[1] === 1);
// The blue channel should be unchanged.
assert(pixelValue[2] === 1);
});


function pixelEq (p1, p2) {
const epsilon = 0.002;
for (let i = 0; i < 3; ++i) {
if (Math.abs(p1[i] - p2[i]) > epsilon) {
return false;
}
}
return true;
};
test('Check pixel equality', function() {
const inputPixel = [0.5, 0.5, 0.5]
// Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel
const image = lib220.createImage(10, 10, inputPixel);
// Process the image.
const outputImage = removeRed(image);
// Check the center pixel.
const centerPixel = outputImage.getPixel(5, 5);
assert(pixelEq(centerPixel, [0, 0.5, 0.5]));
// Check the top-left corner pixel.
const cornerPixel = outputImage.getPixel(0, 0);
assert(pixelEq(cornerPixel, [0, 0.5, 0.5]));
});

test('mapToGBPixel check removed red from pixel', function() {
  const white = [1, 1, 1];
  const redPixel = mapToGBPixel(white);
  assert(pixelEq(redPixel, [0, 1, 1]));
})

test('mapFlipColorsPixel check flipped RGB', function() {
  const pixel = [1, 1, 1];
  const flippedPixel = mapFlipColorsPixel(pixel);
  assert(pixelEq(flippedPixel, [1, 1, 1]));
})

test('mapToGB function definition correct', function() {
  const white = lib220.createImage(10, 10, [1, 1, 1]);
  mapToGB(white).getPixel(0, 0);
  // no assertion, just checks that the code runs to completion
})

test('mapFlipColors function definition correct', function() {
  const white = lib220.createImage(10, 10, [1, 1, 1]);
  mapFlipColors(white).getPixel(0, 0);
  // no assertion, just checks that the code runs to completion
})
