const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let streak = 0;

const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const streakEl = document.getElementById('player-streak');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultTextEl = document.getElementById('result-text');

const buttons = document.querySelectorAll('.rps');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    playerChoiceEl.innerText = `You chose: ${playerChoice}`;
    computerChoiceEl.innerText = `Computer chose: ${computerChoice}`;

    const result = getWinner(playerChoice, computerChoice);
    displayResult(result);
  });
});

function getWinner(player, computer) {
  if (player === computer) return 'draw';

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'player';
  }

  return 'computer';
}

function displayResult(winner) {
  if (winner === 'draw') {
    resultTextEl.innerText = "It's a draw!";
    resultTextEl.style.color = '#888';
  } else if (winner === 'player') {
    resultTextEl.innerText = 'You win!';
    resultTextEl.style.color = 'green';
    playerScore++;
    streak++;
  } else {
    resultTextEl.innerText = 'Computer wins!';
    resultTextEl.style.color = 'red';
    computerScore++;
    streak = 0;
  }

  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;
  streakEl.innerText = streak;
}
