let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
function generateTarget() {
  return Math.floor(Math.random() * 10);
}

function compareGuesses(userGuess, computerGuess, target) {
  const userDifference = Math.abs(userGuess - target);
  const computerDifference = Math.abs(computerGuess - target);

  if (userDifference <= computerDifference) {
    return true; // user wins (also wins ties)
  } else {
    return false; // computer wins
  }
}

function updateScore(winner) {
  if (winner === 'human') {
    humanScore++;
  } else {
    computerScore++;
  }
}

function advanceRound() {
  currentRoundNumber++;
}
