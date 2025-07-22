let score = 0;
let highScore = localStorage.getItem('quickMathHighScore') || 0;
let correctAnswer = 0;
let timer = 5;
let countdown;

const scoreEl = document.getElementById('qm-score');
const highScoreEl = document.getElementById('qm-high-score');
const timerEl = document.getElementById('qm-timer');
const questionEl = document.getElementById('qm-question');
const answerInput = document.getElementById('qm-answer');
const submitBtn = document.getElementById('qm-submit');
const feedbackEl = document.getElementById('qm-feedback');

highScoreEl.textContent = highScore;

function generateQuestion() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const ops = ['+', '-', '×'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  if (op === '+') correctAnswer = a + b;
  else if (op === '-') correctAnswer = a - b;
  else correctAnswer = a * b;

  questionEl.textContent = `${a} ${op} ${b} = ?`;

  timer = 5;
  timerEl.textContent = timer;
  feedbackEl.textContent = '';
  answerInput.value = '';
  answerInput.focus();

  clearInterval(countdown);
  countdown = setInterval(() => {
    timer--;
    timerEl.textContent = timer;
    if (timer === 0) {
      clearInterval(countdown);
      endGame(false);
    }
  }, 1000);
}

function endGame(correct) {
  if (correct) {
    score++;
    scoreEl.textContent = score;
    feedbackEl.textContent = '✅ Correct!';
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('quickMathHighScore', highScore);
      highScoreEl.textContent = highScore;
    }
    generateQuestion();
  } else {
    feedbackEl.textContent = `❌ Time's up! Final Score: ${score}`;
    submitBtn.disabled = true;
    answerInput.disabled = true;
  }
}

submitBtn.addEventListener('click', () => {
  const userAnswer = parseInt(answerInput.value);
  if (userAnswer === correctAnswer) {
    clearInterval(countdown);
    endGame(true);
  } else {
    feedbackEl.textContent = '❌ Wrong! Try again.';
  }
});

generateQuestion();

// Mobile navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
