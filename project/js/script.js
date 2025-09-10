let total = 0;
let correct = 0;
let incorrect = 0;
let currentWord = null;
let wordsPool = [];
let gameLimit = 100;

// елементи
const wordElement = document.getElementById("word");
const optionsContainer = document.getElementById("options");
const correctSpan = document.getElementById("correct");
const incorrectSpan = document.getElementById("incorrect");
const progressSpan = document.getElementById("progress");
const playWordBtn = document.getElementById("playWord");
const toggleWord = document.getElementById("toggleWord");
const wordCountSelect = document.getElementById("wordCount");

// вибрати випадкові слова з повного списку
function getRandomWords(num) {
  return WORDS_A1.sort(() => Math.random() - 0.5).slice(0, num);
}

// старт гри
function resetGame() {
  total = correct = incorrect = 0;
  gameLimit = parseInt(wordCountSelect.value);
  wordsPool = getRandomWords(gameLimit);
  nextWord();
  updateStats();
}

// показати наступне слово
function nextWord() {
  if (wordsPool.length === 0) {
    alert("Гру завершено!");
    return;
  }

  currentWord = wordsPool.pop();
  wordElement.textContent = currentWord.en;

  // автоозвучка
  playCurrentWord();

  // варіанти
  generateOptions(currentWord);
  updateStats();
}

// створити варіанти перекладу (4 кнопки)
function generateOptions(word) {
  optionsContainer.innerHTML = "";

  let options = [word.uk];
  while (options.length < 4) {
    const randomWord = WORDS_A1[Math.floor(Math.random() * WORDS_A1.length)];
    if (!options.includes(randomWord.uk)) {
      options.push(randomWord.uk);
    }
  }

  options = options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(option, btn));
    optionsContainer.appendChild(btn);
  });
}

// перевірка відповіді
function checkAnswer(answer, btn) {
  total++;
  if (answer === currentWord.uk) {
    correct++;
    btn.classList.add("correct");
  } else {
    incorrect++;
    btn.classList.add("incorrect");
  }

  updateStats();

  setTimeout(() => {
    nextWord();
  }, 900);
}

// статистика
function updateStats() {
  correctSpan.textContent = correct;
  incorrectSpan.textContent = incorrect;
  progressSpan.textContent = `${total} / ${gameLimit}`;
}

// озвучка
function playCurrentWord() {
  if (currentWord) {
    const utterance = new SpeechSynthesisUtterance(currentWord.en);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  }
}

playWordBtn.addEventListener("click", playCurrentWord);

// toggle для показу/приховування слова
toggleWord.addEventListener("change", () => {
  if (toggleWord.checked) {
    wordElement.style.visibility = "visible";
  } else {
    wordElement.style.visibility = "hidden";
  }
});

// старт при завантаженні
resetGame();
