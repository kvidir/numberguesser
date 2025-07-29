const gridSize = 4;
let board = [];
let score = 0;
let highScore = localStorage.getItem('mergerHighScore') || 0;

const gridEl = document.getElementById('merger-grid');
const scoreEl = document.getElementById('merger-score');
const highScoreEl = document.getElementById('merger-high-score');
const restartBtn = document.getElementById('restart-merger');

function initBoard() {
  board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}

function addRandomTile() {
  const emptyCells = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[i][j] = Math.random() > 0.1 ? 2 : 4;
  }
}

function updateBoard() {
  gridEl.innerHTML = '';
  board.forEach(row => {
    row.forEach(cell => {
      const tile = document.createElement('div');
      tile.className = `tile tile-${cell}`;
      tile.textContent = cell !== 0 ? cell : '';
      gridEl.appendChild(tile);
    });
  });
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}

function move(direction) {
  let moved = false;
  let rotated = false;

  if (direction === 'ArrowUp' || direction === 'ArrowDown') {
    board = rotateBoard(board);
    rotated = true;
  }

  if (direction === 'ArrowRight' || direction === 'ArrowDown') {
    board = board.map(row => row.reverse());
  }

  const newBoard = [];
  for (let row of board) {
    const filtered = row.filter(n => n !== 0);
    const merged = [];

    let i = 0;
    while (i < filtered.length) {
      if (filtered[i] === filtered[i + 1]) {
        merged.push(filtered[i] * 2);
        score += filtered[i] * 2;
        i += 2;
        moved = true;
      } else {
        merged.push(filtered[i]);
        i++;
      }
    }

    while (merged.length < gridSize) merged.push(0);
    newBoard.push(merged);
  }

  board = newBoard;

  if (direction === 'ArrowRight' || direction === 'ArrowDown') {
    board = board.map(row => row.reverse());
  }

  if (rotated) {
    board = rotateBoard(board, true);
  }

  updateBoard();

  if (moved) {
    addRandomTile();
    updateBoard();
  }

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('mergerHighScore', highScore);
  }

  if (checkGameOver()) {
    setTimeout(() => {
      alert(`💀 Game Over!\nYour score: ${score}`);
    }, 200);
  }
}

function rotateBoard(matrix, reverse = false) {
  const newMatrix = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      newMatrix[i][j] = reverse ? matrix[j][gridSize - i - 1] : matrix[gridSize - j - 1][i];
    }
  }
  return newMatrix;
}

function checkGameOver() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 0) return false;
      if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) return false;
      if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  return true;
}

document.addEventListener('keydown', e => {
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (keys.includes(e.key)) {
    e.preventDefault();
    move(e.key);
  }
});

restartBtn.addEventListener('click', () => {
  initBoard();
});

initBoard();

// --- Swipe support for mobile devices ---
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal swipe
    if (dx > 30) {
      moveRight();
    } else if (dx < -30) {
      moveLeft();
    }
  } else {
    // Vertical swipe
    if (dy > 30) {
      moveDown();
    } else if (dy < -30) {
      moveUp();
    }
  }
}, { passive: true });

// Mobile navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
