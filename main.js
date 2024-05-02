import "./style.css";
// Card data
const cardsArray = [
  {
    name: "pokemon1",
    img: "./assets/pokemon1.jpg",
  },
  {
    name: "pokemon2",
    img: "./assets/pokemon2.jpg",
  },
  {
    name: "pokemon3",
    img: "./assets/pokemon3.jpg",
  },
  {
    name: "pokemon4",
    img: "./assets/pokemon4.jpg",
  },
  {
    name: "pokemon5",
    img: "./assets/pokemon5.jpg",
  },
  {
    name: "pokemon6",
    img: "./assets/pokemon6.jpg",
  },
  {
    name: "pokemon7",
    img: "./assets/pokemon7.jpg",
  },
  {
    name: "pokemon8",
    img: "./assets/pokemon8.jpg",
  },
  {
    name: "pokemon9",
    img: "./assets/pokemon9.jpg",
  },
  {
    name: "pokemon10",
    img: "./assets/pokemon10.jpg",
  },
  {
    name: "pokemon11",
    img: "./assets/pokemon11.jpg",
  },
  {
    name: "pokemon12",
    img: "../assets/pokemon12.jpg",
  },
];
// GAME
const game = document.getElementById("game");
const grid = document.createElement("section");
grid.classList.add("grid");
// game.addEventListener("click", secCount);
game.appendChild(grid);
// DOUBLE ARREY
let gameGrid = cardsArray.concat(cardsArray);
// FOR RAMDOMISING THE CARDS EVERY TIME WE REFERESH THE PAGE
gameGrid.sort(() => 0.5 - Math.random());
// CREATE CARDS
gameGrid.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add(`card`, `${item.name}`);
  card.dataset.name = item.name;
  const front = document.createElement("div");
  front.classList.add("front");
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});
// ATTEMPTS COUNT
let attemptCount = 0;
let attempts = document.querySelector(".count");
attempts.innerText = attemptCount;
// TIME COUNT
let sec = 0;
let timeInSec;
let min = 0;
function secCount() {
  sec = sec + 1;
  document.querySelector(".sec-count").innerText = Math.floor(sec % 60);
  timeInSec = setTimeout(secCount, 1000);
  min = Math.floor(sec / 60);
  document.querySelector(".min-count").innerText = min;
}
let timeStarted = false;
// secCount();
// RESET ALL
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let confirmReset = confirm("Whole game will start again. continue to reset?");
  if (confirmReset === true) {
    window.location.reload();
  }
});
// VARIABLES FOR THE GAME
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let count = 0;
let delay = 1200;
// FUNCTIONS FOR THE GAME
const match = () => {
  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
};
const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};
// GAME LOGICS
grid.addEventListener("click", function (event) {
  !timeStarted && secCount();
  timeStarted = true;
  let clicked = event.target;
  attemptCount++;
  attempts.innerText = attemptCount;
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty...
    if (firstGuess !== "" && secondGuess !== "") {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        // run the match function
        // match();
        // resetGuesses();
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        let matched = document.querySelectorAll(`.${firstGuess}`);
        matched.forEach((node) =>
          node.addEventListener("click", function (e) {
            e.stopPropagation();
          })
        );
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
  }
  // Set previous target to clicked
  previousTarget = clicked;
});
