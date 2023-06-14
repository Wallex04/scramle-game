// creating a variable
const textWord = document.querySelector(".shuffle");
const textHint = document.querySelector(".hint span");
const timerBtn = document.querySelector(".time b");
const refreshBtn = document.querySelector(".refresh");
const inputWord = document.querySelector("input");
const startBtn = document.querySelector(".start");

// Creating an object List for the word scramble game
const words = [
  {
    word: "smartphone",
    Hint: "Portable device for communication and computing",
  },
  {
    word: "refrigerator",
    Hint: "Appliance for cooling and preserving food",
  },
  {
    word: "helicopter",
    Hint: "Aircraft with rotating blades",
  },

  {
    word: "telescope",
    Hint: "Optical instrument for viewing distant objects",
  },

  {
    word: "camcorder",
    Hint: "Portable device for recording videos",
  },

  {
    word: "microscope",
    Hint: "Optical instrument for magnifying small objects",
  },
  {
    word: "projector",
    Hint: "Device for displaying images and videos on a screen",
  },

  {
    word: "blender",
    Hint: "Appliance for mixing and blending ingredients",
  },
  {
    word: "Projectorm",
    Hint: "Device for displaying images and videos on a screen",
  },
  {
    word: "segway",
    Hint: "Electric personal transporter",
  },
  {
    word: "Quadcopter",
    Hint: "Drone with four rotors",
  },
];

// Variable holding the correctword, timer and maxTime.
let correctWord, timer, maxTime;

const initialTimer = () => {
  maxTime = 30;
  timerBtn.innerText = maxTime;
  timer = setInterval(() => {
    maxTime--;
    timerBtn.innerText = maxTime;
    if (maxTime === 0) {
      stopTimer();
      alert(`Time's up! ${correctWord.toUpperCase()} was the correct word`);

      refreshBtn.style.display = "block";
      startBtn.disabled = false;
    } else if (inputWord.value.toLowerCase() === correctWord) {
      stopTimer();
      alert(`Great! ${inputWord.value.toUpperCase()} is the correct word`);

      refreshBtn.style.display = "block";
      startBtn.disabled = false;
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};
// starting the game
const startGame = () => {
  levelGame();
  initialTimer();
  inputWord.disabled = false;
};

// starting the game with the refresh button
const resetGame = () => {
  refreshBtn.style.display = "none";
  textHint.innerHTML = "";
  textWord.innerHTML = "";
  timerBtn.innerText = 30;
  inputWord.value = "";
  inputWord.disabled = true;
};

// initializing the start game and picking random word
const levelGame = () => {
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  textWord.innerHTML = wordArray.join("");
  textHint.innerHTML = randomObj.Hint;
  correctWord = randomObj.word.toLowerCase();
  inputWord.value = "";
  inputWord.setAttribute("maxlength", correctWord.length);
};

startBtn.addEventListener("click", () => {
  startGame();
  startBtn.disabled = true;
});

refreshBtn.addEventListener("click", resetGame);

window.onload = () => {
  refreshBtn.style.display = "none";
};

inputWord.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputWord.value.toLowerCase() === correctWord) {
      stopTimer();
      alert(`Great! ${inputWord.value.toUpperCase()} is the correct word`);
      levelGame();
    } else {
      alert(`Oops! ${inputWord.value.toUpperCase()} is not the correct word`);
    }
  }
});
