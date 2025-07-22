let score = 0;
let streak = 0;
let highScore = localStorage.getItem('evenOrOddHighScore') || 0;
let currentNumber = 0;
let timer = 5;
let countdown;

const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const highScoreEl = document.getElementById('high-score');
const timerEl = document.getElementById('timer');
const numberDisplay = document.getElementById('number-display');
const feedbackMsg = document.getElementById('feedback-msg');
const evenBtn = document.getElementById('even-btn');
const oddBtn = document.getElementById('odd-btn');
const nextBtn = document.getElementById('next-btn');

highScoreEl.textContent = highScore;

function generateNumber() {
  clearInterval(countdown);
  timer = 5;
  updateTimerDisplay();

  currentNumber = Math.floor(Math.random() * 100);
  numberDisplay.textContent = currentNumber;
  numberDisplay.className = '';
  feedbackMsg.textContent = '';
  nextBtn.disabled = true;
  evenBtn.disabled = false;
  oddBtn.disabled = false;

  countdown = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer === 0) {
      clearInterval(countdown);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.textContent = timer;
}

function handleGuess(isEvenGuess) {
  clearInterval(countdown);
  const isEven = currentNumber % 2 === 0;
  const correct = isEven === isEvenGuess;

  if (correct) {
    score++;
    streak++;
    feedbackMsg.textContent = "✅ Correct!";
    numberDisplay.className = 'correct';
  } else {
    streak = 0;
    feedbackMsg.textContent = `❌ Wrong! It was ${isEven ? 'even' : 'odd'}.`;
    numberDisplay.className = 'wrong';
  }

  scoreEl.textContent = score;
  streakEl.textContent = streak;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('evenOrOddHighScore', highScore);
    highScoreEl.textContent = highScore;
  }

  evenBtn.disabled = true;
  oddBtn.disabled = true;
  nextBtn.disabled = false;
}

function handleTimeout() {
  streak = 0;
  feedbackMsg.textContent = `⏰ Time's up!`;
  numberDisplay.className = 'wrong';
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
