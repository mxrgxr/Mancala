// Constants
const NUM_PITS = 6;
const INITIAL_SEEDS = 4;
const DELAY_MS = 500;
const P1_STORE = 6;
const P2_STORE = 13;

// State variables
let currentPlayer;
let board;
let winner;
let isAnimating = false;

// Cached HTML elements
const pits = document.querySelectorAll(".pit");
const stores = Array.from(document.querySelectorAll(".store"));
const turnMsg = document.querySelector("h1");
const resetBtn = document.querySelector("button");

// Event listeners
pits.forEach(pit => pit.addEventListener("click", handlePlayerChoice));
resetBtn.addEventListener("click", initialize);

// Initialize the game
initialize();

function initialize() {
  currentPlayer = 1;
  winner = null;
  board = [
    4, 4, 4, 4, 4, 4, 0, // PLAYER 1 PITS AND STORE
    4, 4, 4, 4, 4, 4, 0, // PLAYER 2 PITS AND STORE
  ];
  stores.forEach(store => (store.textContent = "0"));
  render();
}

function render() {
  renderBoard();
  renderMessage();
}
async function handlePlayerChoice(event) {
  // stops program from running if stone distribution in progress
  if (isAnimating) return;
  // obtain data related to clicked pit
  const pit = event.target;
  const pitIndex = parseInt(pit.dataset.pit);
  const player = pitIndex < NUM_PITS + 1 ? 1 : 2;
  // stops opponent from clicking during player's turn
  if (player !== currentPlayer)return;
  // "pick up" stones and update board array
  let stonesInHand = board[pitIndex];
  board[pitIndex] = 0;
  renderBoard();
  // initialize currentPit variable
  let currentPit = pitIndex;
  let extraTurn = false;
  // stone distribution in progress
  isAnimating = true;
  // while player has stones in hand continue
    while (stonesInHand > 0) {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    // move to next pit
    currentPit = (currentPit + 1) % (2 * (NUM_PITS + 1));
    // check if store belongs to player otherwise
    if ((currentPit === P1_STORE && player === 2) || (currentPit === P2_STORE && player === 1)) {
      // skip by adding one to currentPit
      currentPit = (currentPit + 1);
    }
    // if current pit is player store
    if ((currentPit === P1_STORE && currentPlayer === 1) || (currentPit === P2_STORE && currentPlayer === 2)) {
      // find index of current player's store
      const currentStoreIndex = currentPlayer - 1;
      // access and add stone to player store
      stores[currentStoreIndex].textContent = parseInt(stores[currentStoreIndex].textContent) + 1;
      board[currentPit]++;
      // decrease remaining stones to play
      stonesInHand--;
      // check if player ran out of stones in own store to grant another turn
      if (stonesInHand === 0) {
        extraTurn = true;
      }
    } else {
      // increase stones in current pit
      board[currentPit]++;
      stonesInHand--;
      renderBoard();
    }
  }
  isAnimating = false;

  if (isGameOver()) {
    endGame();
  } else if (!extraTurn) {
    currentPlayer = 3 - currentPlayer;
    renderMessage();
  }
}

function renderBoard() {
  pits.forEach((pit, index) => {
    const pitIndex = parseInt(pit.dataset.pit);
    if (board[pitIndex] !== undefined) {
      pit.textContent = board[pitIndex];
    }
  });
}
function renderMessage() {
  turnMsg.textContent = `Player ${currentPlayer}'s Turn`;
}

function isGameOver() {
  const storeStones = stores.map(store => parseInt(store.textContent));
  return storeStones.some(stones => stones > 24);
}

function endGame() {
  const storeStones = stores.map(store => parseInt(store.textContent));
  if (storeStones[0] > storeStones[1]) {
    winner = 1;
  } else if (storeStones[0] < storeStones[1]) {
    winner = 2;
  } else {
    winner = "Tie";
  }
  turnMsg.textContent = `Game Over! ${winner === "Tie" ? "It's a Tie!" : "Player " + winner + " Wins!"}`;
}