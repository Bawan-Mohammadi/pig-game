"use strict";
const dices = document.querySelectorAll(".dice-face");
dices.forEach((dice) => {
  dice.classList.add("hidden");
});
//because it's an arrey and I want it to have the class
//from the beginnig, I did this
const playerZero = document.getElementById("player--0");
const boxZero = document.querySelector(".box--0");
const boxOne = document.querySelector(".box--1");
const playerOne = document.getElementById("player--1");
const scoreZero = document.getElementById("score--0");
const scoreOne = document.getElementById("score--1");
const hidden = document.querySelector(".hidden");
const currentZero = document.querySelector(".c--0");
const currentOne = document.querySelector(".c--1");
const hold = document.querySelector(".btns-container-hold");
const diceButton = document.querySelector(".btns-container-dice");
const newGame = document.querySelector(".new-game");

let gamePlaying, totalScore, currentScore, activePlayer;
//they should be outside the scope to work
function newGameFunction() {
  gamePlaying = true;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  currentOne.textContent = 0;
  currentZero.textContent = 0;
  dices.forEach((dice) => {
    dice.classList.add("hidden");
  });
  boxOne.classList.remove("winner");
  boxZero.classList.remove("winner");
  boxZero.classList.add("player-active");
  boxOne.classList.remove("player-active");
}
newGameFunction();

function reset() {
  currentScore = 0;
  document.querySelector(`.c--${activePlayer}`).textContent = 0;
}
function updateActivePlayer() {
  if (activePlayer === 0) {
    boxZero.classList.add("player-active");
    boxOne.classList.remove("player-active");
  } else {
    boxOne.classList.add("player-active");
    boxZero.classList.remove("player-active");
  }
}
updateActivePlayer();
scoreZero.textContent = 0;
scoreOne.textContent = 0;
const displayedDice = function (classNumber) {
  dices.forEach((dice) => dice.setAttribute("data-face", classNumber));
  return;
};
const change = function () {
  //switch players
  // if (activePlayer ===0){
  //     activePlayer=1
  // }
  // else{activePlayer===0}
  activePlayer = activePlayer === 0 ? 1 : 0;
  return;
};
diceButton.addEventListener("click", function () {
  if (gamePlaying) {
    dices.forEach((dice) => dice.classList.remove("hidden"));
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);
    switch (randomNumber) {
      case 1:
        displayedDice("1");
        break;
      case 2:
        displayedDice("2");
        break;
      case 3:
        displayedDice("3");
        break;
      case 4:
        displayedDice("4");
        break;
      case 5:
        displayedDice("5");
        break;
      case 6:
        displayedDice("6");
        break;
    }

    if (randomNumber !== 1 || totalScore[activePlayer] === 99) {
      currentScore = currentScore + randomNumber;
      document.querySelector(`.c--${activePlayer}`).textContent = currentScore;
      // the active player is either 0 or 1 so we let the number decide.
    } else {
      reset();
      change();
      updateActivePlayer();
    }
  }
});
// if it was a picture: name.src = `picname.png`

hold.addEventListener("click", function () {
  if (gamePlaying) {
    if (totalScore[activePlayer] + currentScore > 100) {
      reset();
      change();
      updateActivePlayer();
      return;
    }
    totalScore[activePlayer] = currentScore + totalScore[activePlayer];
    // if player is one then the total score would also be at one
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] === 100) {
      gamePlaying = false;
      boxZero.classList.remove("player-active");
      boxOne.classList.remove("player-active");
      document.querySelector(`.box--${activePlayer}`).classList.add("winner");

      dices.forEach((dice) => {
        dice.classList.add("hidden");
        
      });
      return; //when player wins stop the function
    }
    reset();
    change();
    updateActivePlayer();
  }
});
newGame.addEventListener("click", function () {
  newGameFunction();
});
