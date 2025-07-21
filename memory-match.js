const iconPool = ['🐶','🐱','🦊','🐼','🐵','🦁','🐷','🐸','🐔','🐮','🐰','🐙','🐢','🐳','🦉','🐞','🦄','🐝'];
let cardValues = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matches = 0;
let time = 0;
let timerInterval;

let gridSize = 4;
let pairsToUse = 8;

const grid = document.getElementById('memory-grid');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const timerEl = document.getElementById('timer');
const difficultySelector = document.getElementById('difficulty');
const restartBtn = document.getElementById('restart');

// Optional sound effects
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');
const winSound = new Audio('sounds/win.mp3');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerEl.textContent = time;
  }, 1000);
}

function setDifficulty() {
  const level = difficultySelector.value;
  if (level === 'easy') {
    gridSize = 4;
    pairsToUse = 4;
  } else if (level === 'medium') {
    gridSize = 4;
    pairsToUse = 8;
  } else if (level === 'hard') {
    gridSize = 6;
    pairsToUse = 18;
  }
}

function createBoard() {
  setDifficulty();
  cardValues = [...iconPool.slice(0, pairsToUse), ...iconPool.slice(0, pairsToUse)];
  shuffle(cardValues);

  grid.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
  grid.innerHTML = '';
  [firstCard, secondCard] = [null, null];
  lock = false;
  time = 0;
  moves = 0;
  matches = 0;
  movesEl.textContent = 0;
  matchesEl.textContent = 0;
  timerEl.textContent = 0;
  clearInterval(timerInterval);
  startTimer();

  cardValues.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.textContent = '';
    card.addEventListener('click', handleFlip);
    grid.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.target;
  if (lock || card.classList.contains('matched') || card === firstCard) return;

  flipSound.play();
  card.classList.add('revealed');
  card.textContent = card.dataset.icon;

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lock = true;
    moves++;
    movesEl.textContent = moves;

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
      matchSound.play();
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matches++;
      matchesEl.textContent = matches;
      resetTurn();

      if (matches === pairsToUse) {
        clearInterval(timerInterval);
        winSound.play();
        setTimeout(() => alert(`🎉 You won in ${moves} moves and ${time} seconds!`), 400);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetTurn();
      }, 800);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

// Hook up difficulty and restart
difficultySelector.addEventListener('change', createBoard);
restartBtn.addEventListener('click', createBoard);

createBoard();

// Mobile navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
