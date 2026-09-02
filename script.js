// ─── State ───────────────────────────────────────────────────────────────────
let passages = {}; // will hold all passages from data.json
let currentPassage = ""; // the text the user is typing against
let currentDifficulty = "easy";
let currentMode = "timed";

// ─── DOM refs ────────────────────────────────────────────────────────────────
const passageEl = document.getElementById("passage");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const timerEl = document.getElementById("timer");
const pbEl = document.getElementById("personal-best");
const restartBtn = document.getElementById("restart-btn");

// ─── Load data ───────────────────────────────────────────────────────────────
async function loadPassages() {
  const response = await fetch("data.json");
  const data = await response.json();
  passages = data; // store for later
  newPassage(); // show the first passage straight away
}

// ─── Pick + render a passage ─────────────────────────────────────────────────
function newPassage() {
  const pool = passages[currentDifficulty]; // e.g. passages['easy']
  const random = Math.floor(Math.random() * pool.length);
  currentPassage = pool[random].text;

  renderPassage();
}

function renderPassage() {
  passageEl.innerHTML = ""; // clear whatever was there

  for (const char of currentPassage) {
    const span = document.createElement("span");
    span.textContent = char;
    passageEl.appendChild(span);
  }
}

// ─── Kick everything off ─────────────────────────────────────────────────────
loadPassages();

// ─── Typing state ────────────────────────────────────────────────────────────
let charIndex = 0; // which character the user is currently on
let mistakes = 0; // total wrong keypresses

// ─── Listen for keypresses ───────────────────────────────────────────────────
document.addEventListener("keydown", handleKeydown);

function handleKeydown(e) {
  if (e.key.length > 1) return;

  // start the timer on the first keypress
  if (!testStarted) {
    startTimer();
  }

  const spans = passageEl.querySelectorAll("span");
  // ... rest stays exactly the same

  // Don't go past the end of the passage
  if (charIndex >= spans.length) return;

  const expected = currentPassage[charIndex];
  const typed = e.key;

  if (typed === expected) {
    spans[charIndex].classList.add("correct");
  } else {
    spans[charIndex].classList.add("incorrect");
    mistakes++;
  }

  charIndex++;

  // Move the "active" cursor highlight
  spans.forEach((s) => s.classList.remove("active"));
  if (charIndex < spans.length) {
    spans[charIndex].classList.add("active");
  }
}

// ─── Timer ───────────────────────────────────────────────────────────────────
let timer = null;
let timeLeft = 60;
let testStarted = false;

function startTimer() {
  testStarted = true;

  timer = setInterval(() => {
    timeLeft--;

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerEl.textContent = mins + ":" + String(secs).padStart(2, "0");

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  console.log("Test ended!");
}
