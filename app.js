const tinycolor = require("tinycolor2");

window.onload = function() {

  // Get image input and canvas elements
  const imageInput = document.getElementById('image-input');
  const imageCanvas = document.getElementById('image-canvas');
  const colorOutput = document.getElementById('color-output');

  // Add event listener to the image input
  imageInput.addEventListener('change', async (e) => {
    // Get selected image file
    const imageFile = e.target.files[0];

    // Create an image object
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);

    // Draw image on the canvas
    image.onload = () => {
      imageCanvas.width = image.width;
      imageCanvas.height = image.height;
      const ctx = imageCanvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
    };
  });

  // Add event listener to the canvas
  imageCanvas.addEventListener('click', (e) => {
    const x = e.clientX - imageCanvas.offsetLeft;
    const y = e.clientY - imageCanvas.offsetTop;

    const ctx = imageCanvas.getContext('2d');
    const pixelData = ctx.getImageData(x, y, 1, 1).data;

    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];
    console.log(`r: ${r}, g: ${g}, b: ${b}`);
    const hex = tinycolor({r, g, b}).toHexString();
    console.log(hex);
    // Convert the pixel color to a human-readable color name
    const color = tinycolor(hex);
    if (!color.isValid()) {
        console.log("Invalid color: ", hex);
        return;
    }
    const closestColor = tinycolor.mostReadable(hex, tinycolor.names);
    if(closestColor){
    console.log(closestColor.toName())
    }
    colorOutput.innerHTML = closestColor;
    document.querySelector(".step-3").style.display = "block";
  });
}
