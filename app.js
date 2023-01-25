
import getPixels from './node_modules/get-image-pixels/';

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
    image.onload = async () => {
      imageCanvas.width = image.width;
      imageCanvas.height = image.height;
      const ctx = imageCanvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const pixels = await getPixels(image);
    };
  });
  
  // Add event listener to the canvas
  imageCanvas.addEventListener('click', async (e) => {
    const x = e.clientX - imageCanvas.offsetLeft;
    const y = e.clientY - imageCanvas.offsetTop;

    // Get the pixel information at the specified coordinates
    const pixelIndex = (y * imageCanvas.width + x) * 4;
    const r = pixels.data[pixelIndex];
    const g = pixels.data[pixelIndex + 1];
    const b = pixels.data[pixelIndex + 2];
    const a = pixels.data[pixelIndex + 3];

    console.log(`r: ${r}, g: ${g}, b: ${b}, a: ${a}`);
  
    // Convert the pixel color to a human-readable color name
    const hex = rgbToHex(r, g, b);
    colorSelected = true;
    fetch(`http://localhost:8010/proxy/search/json/?hex=${hex}`)
    .then(response => response.text())
    .then(responseText => {
        try {
            const data = JSON.parse(responseText);
            colorOutput.innerHTML = data.name;
        } catch (error) {
            console.error(error);
        }
    });
    document.getElementById("hex-output").innerHTML = hex;
    document.querySelector(".step-3").style.display = "block";
  });
  }
  