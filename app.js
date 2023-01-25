
window.onload = function(){
// Get image input and canvas elements
const imageInput = document.getElementById('image-input');
const imageCanvas = document.getElementById('image-canvas');
const colorOutput = document.getElementById('color-output');

// Create a canvas context
const ctx = imageCanvas.getContext('2d');

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Add event listener to the image input
imageInput.addEventListener('change', (e) => {
  // Get selected image file
  const imageFile = e.target.files[0];

  // Create an image object
  const image = new Image();
  image.src = URL.createObjectURL(imageFile);

  // Draw image on the canvas
  image.onload = () => {
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
  };
});

// Add event listener to the canvas
imageCanvas.addEventListener('click', (e) => {
  // Get the x and y coordinates of the click event
  const x = e.clientX - imageCanvas.offsetLeft;
  const y = e.clientY - imageCanvas.offsetTop;

  // Get the pixel color at the specified coordinates
  const pixelColor = ctx.getImageData(x, y, 1, 1).data;
  
  // Convert the pixel color to a human-readable color name
  const hex = rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2]);
  fetch(`https://a645-184-88-51-211.ngrok.io/search/json/?hex=${hex}`)
  .then(response => response.text())
  .then(responseText => {
      try {
          const data = JSON.parse(responseText);
          colorOutput.innerHTML = data.name;
      } catch (error) {
          console.error(error);
      }
  });
    colorOutput.innerHTML = hex;
});
}