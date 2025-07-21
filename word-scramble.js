const words = ['javascript', 'arcade', 'scramble', 'keyboard', 'function', 'variable', 'object', 'element', 'browser', 'coding'];

let currentWord = '';
let scrambled = '';

const scrambleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
};

const pickNewWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  scrambled = scrambleWord(currentWord);
  document.getElementById('scrambled-word').innerText = scrambled;
  document.getElementById('user-guess').value = '';
  document.getElementById('result-message').innerText = '';
  document.getElementById('next-word').style.display = 'none';
};

document.getElementById('submit-guess').addEventListener('click', () => {
  const guess = document.getElementById('user-guess').value.trim().toLowerCase();
  const resultMsg = document.getElementById('result-message');

  if (guess === currentWord) {
    resultMsg.innerText = '🎉 Correct!';
    resultMsg.style.color = 'green';
    document.getElementById('next-word').style.display = 'block';
  } else {
    resultMsg.innerText = '❌ Try again.';
    resultMsg.style.color = 'red';
  }
});

document.getElementById('next-word').addEventListener('click', pickNewWord);

// Initial load
pickNewWord();
