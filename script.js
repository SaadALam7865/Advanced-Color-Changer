let colorPicker = document.getElementById("color-picker");
let randomBtn = document.getElementById("random-btn");
let resultBox = document.getElementById("result-box");
let historyBox = document.getElementById("history-box");
let coptbtn = document.getElementById("copy-btn");
let copyMsg = document.getElementById("copy-msg");

let colorHistory = [];

// Function to check brightness of color
let getBrightness = (hex) => {
  hex = hex.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  // Formula for brightness perception
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// Change color function
let changeColor = (color) => {
  resultBox.style.backgroundColor = color;
  resultBox.textContent = color;

  // Auto adjust text color
  let brightness = getBrightness(color);
  if (brightness > 150) {
    resultBox.style.color = "#000"; // Light bg → black text
  } else {
    resultBox.style.color = "#fff"; // Dark bg → white text
  }

  addToHistory(color);
};

// Add to history
let addToHistory = (color) => {
  if (!colorHistory.includes(color)) {
    colorHistory.push(color);

    let colorDiv = document.createElement("div");
    colorDiv.classList.add("history-item");
    colorDiv.style.backgroundColor = color;

    colorDiv.addEventListener("click", () => {
      changeColor(color);
    });

    historyBox.appendChild(colorDiv);
  }
};

// Random color generator
let getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Event Listeners
colorPicker.addEventListener("input", () => {
  changeColor(colorPicker.value);
});

randomBtn.addEventListener("click", () => {
  let randomColor = getRandomColor();
  changeColor(randomColor);
  colorPicker.value = randomColor;
});
// Copy to clipboard
coptbtn.addEventListener("click", () => {
  let colorCode = resultBox.textContent;
  navigator.clipboard.writeText(colorCode).then(() => {
    copyMsg.style.opacity = 1;
    setTimeout(() => {
      copyMsg.style.opacity = 0;
    }, 1500);
  });
});

// Default load
window.addEventListener("load", () => {
  changeColor(colorPicker.value);
});
