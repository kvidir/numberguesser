let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Generate a random target between 0–9
function generateTarget() {
  return Math.floor(Math.random() * 10);
}

// Compare guesses to target
function compareGuesses(userGuess, computerGuess, target) {
  const userDifference = Math.abs(Number(userGuess) - target);
  const computerDifference = Math.abs(computerGuess - target);
  return userDifference <= computerDifference;
}

// Update score based on winner
function updateScore(winner) {
  if (winner === 'human') {
    humanScore++;
  } else {
    computerScore++;
  }
}

// Advance to next round
function advanceRound() {
  currentRoundNumber++;
}

// Validate input is between 0 and 9
function isValidGuess(guess) {
  const num = Number(guess);
  return Number.isInteger(num) && num >= 0 && num <= 9;
}
