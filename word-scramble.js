const words = [
  'javascript', 'arcade', 'scramble', 'keyboard', 'function',
  'variable', 'object', 'element', 'browser', 'coding'
];

let currentWord = '';
let scrambled = '';
let score = 0;
let streak = 0;
let timer = 15;
let countdown;

const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const timerEl = document.getElementById('timer');

const scrambleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

const pickNewWord = () => {
  clearInterval(countdown);
  timer = 15;
  timerEl.innerText = timer;

  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambled = scrambleWord(currentWord);
  document.getElementById('scrambled-word').innerText = scrambled;
  document.getElementById('user-guess').value = '';
  document.getElementById('result-message').innerText = '';
  document.getElementById('next-word').style.display = 'none';

  startTimer();
};

const startTimer = () => {
  countdown = setInterval(() => {
    timer--;
    timerEl.innerText = timer;

    if (timer === 0) {
      clearInterval(countdown);
      endRound(false); // Time ran out
    }
  }, 1000);
};

const endRound = (won) => {
  const resultMsg = document.getElementById('result-message');

  if (won) {
    resultMsg.innerText = '🎉 Correct!';
    resultMsg.style.color = 'green';
    score++;
    streak++;
  } else {
    resultMsg.innerText = `❌ Time’s up! The word was "${currentWord}".`;
    resultMsg.style.color = 'red';
    streak = 0;
  }

  scoreEl.innerText = score;
  streakEl.innerText = streak;
  document.getElementById('next-word').style.display = 'block';
};

document.getElementById('submit-guess').addEventListener('click', () => {
  const guess = document.getElementById('user-guess').value.trim().toLowerCase();

  if (guess === currentWord) {
    clearInterval(countdown);
    endRound(true);
  } else {
    document.getElementById('result-message').innerText = '❌ Try again.';
    document.getElementById('result-message').style.color = 'red';
  }
});

document.getElementById('next-word').addEventListener('click', pickNewWord);

// Load first word
pickNewWord();
