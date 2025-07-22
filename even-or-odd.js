let score = 0;
let streak = 0;
let currentNumber = 0;

const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const numberDisplay = document.getElementById('number-display');
const feedbackMsg = document.getElementById('feedback-msg');
const evenBtn = document.getElementById('even-btn');
const oddBtn = document.getElementById('odd-btn');
const nextBtn = document.getElementById('next-btn');

function generateNumber() {
  currentNumber = Math.floor(Math.random() * 100);
  numberDisplay.textContent = currentNumber;
  feedbackMsg.textContent = '';
  nextBtn.disabled = true;
  evenBtn.disabled = false;
  oddBtn.disabled = false;
}

function handleGuess(isEvenGuess) {
  const isEven = currentNumber % 2 === 0;
  const correct = isEven === isEvenGuess;

  if (correct) {
    score++;
    streak++;
    feedbackMsg.textContent = "✅ Correct!";
  } else {
    streak = 0;
    feedbackMsg.textContent = `❌ Wrong! It was ${isEven ? 'even' : 'odd'}.`;
  }

  scoreEl.textContent = score;
  streakEl.textContent = streak;
  evenBtn.disabled = true;
  oddBtn.disabled = true;
  nextBtn.disabled = false;
}

evenBtn.addEventListener('click', () => handleGuess(true));
oddBtn.addEventListener('click', () => handleGuess(false));
nextBtn.addEventListener('click', generateNumber);

generateNumber();

// Mobile navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
