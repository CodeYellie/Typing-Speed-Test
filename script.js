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
