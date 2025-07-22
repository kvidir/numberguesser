const box = document.getElementById('reaction-box');
const message = document.getElementById('reaction-message');
const result = document.getElementById('reaction-result');

let startTime, timeout, waiting = false;

function getRandomDelay(min = 1000, max = 3000) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  result.textContent = '';
  box.style.backgroundColor = '#ddd';
  message.textContent = 'Wait for green...';
  waiting = true;

  timeout = setTimeout(() => {
    box.style.backgroundColor = '#4caf50';
    message.textContent = 'CLICK!';
    startTime = new Date().getTime();
    waiting = false;
  }, getRandomDelay());
}

box.addEventListener('click', () => {
  if (!startTime && !waiting) {
    startGame();
  } else if (waiting) {
    clearTimeout(timeout);
    message.textContent = 'Too soon! Wait for green.';
    box.style.backgroundColor = '#f44336';
    waiting = false;
  } else {
    const reactionTime = new Date().getTime() - startTime;
    result.textContent = `⏱ Your time: ${reactionTime} ms`;
    message.textContent = 'Click to try again!';
    startTime = null;
  }
});

// Mobile navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('navbar-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
