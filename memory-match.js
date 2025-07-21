const icons = ['🐶','🐱','🦊','🐼','🐵','🦁','🐷','🐸'];
let cardValues = [...icons, ...icons];
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matches = 0;
let time = 0;
let timerInterval;

const grid = document.getElementById('memory-grid');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const timerEl = document.getElementById('timer');

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

function createBoard() {
  shuffle(cardValues);
  grid.innerHTML = '';
  cardValues.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.textContent = '';
    card.addEventListener('click', handleFlip);
    grid.appendChild(card);
  });
  time = 0;
  moves = 0;
  matches = 0;
  movesEl.textContent = 0;
  matchesEl.textContent = 0;
  timerEl.textContent = 0;
  clearInterval(timerInterval);
  startTimer();
}

function handleFlip(e) {
  const card = e.target;
  if (lock || card.classList.contains('matched') || card === firstCard) return;

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
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matches++;
      matchesEl.textContent = matches;
      resetTurn();
      if (matches === icons.length) {
        clearInterval(timerInterval);
        setTimeout(() => alert(`🎉 You won in ${moves} moves and ${time} seconds!`), 300);
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

createBoard();
