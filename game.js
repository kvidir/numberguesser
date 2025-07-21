let target;

const humanGuessInput = document.getElementById('human-guess');
const roundNumberDisplay = document.getElementById('round-number');
const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');
const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

// Guess button click
guessButton.addEventListener('click', () => {
  const currentHumanGuess = humanGuessInput.value;

  if (!isValidGuess(currentHumanGuess)) {
    alert('Please enter a whole number between 0 and 9.');
    return;
  }

  target = generateTarget();
  const computerGuess = Math.floor(Math.random() * 10);

  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;

  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target);
  const winner = humanIsWinner ? 'human' : 'computer';

  updateScore(winner);

  if (humanIsWinner) {
    guessButton.innerText = 'You Win 🎉';
    guessButton.classList.add('winning-text', 'fade-in');
  } else {
    computerWinsDisplay.innerText = 'Computer Wins 😈';
    computerWinsDisplay.classList.add('fade-in');
  }

  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;

  guessButton.setAttribute('disabled', true);
  nextRoundButton.removeAttribute('disabled');
});

// Next round click
nextRoundButton.addEventListener('click', () => {
  advanceRound();
  roundNumberDisplay.innerText = currentRoundNumber;

  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Reset UI
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'Make a Guess';
  humanGuessInput.value = 0;
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text', 'fade-in');
  computerWinsDisplay.classList.remove('fade-in');
  handleValueChange(0);
});

// +/- controls
addButton.addEventListener('click', () => {
  const newVal = Number(humanGuessInput.value) + 1;
  humanGuessInput.value = newVal;
  handleValueChange(newVal);
});

subtractButton.addEventListener('click', () => {
  const newVal = Number(humanGuessInput.value) - 1;
  humanGuessInput.value = newVal;
  handleValueChange(newVal);
});

// Enable/disable +/- buttons based on value
const handleValueChange = value => {
  const num = Number(value);
  addButton.disabled = num >= 9;
  subtractButton.disabled = num <= 0;
};

// Validate input manually typed
humanGuessInput.addEventListener('input', e => {
  handleValueChange(e.target.value);
});
