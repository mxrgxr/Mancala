// Constants
const NUM_PITS = 6;
const INITIAL_SEEDS = 4;
const DELAY_MS = 1000;

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
    [4, 4, 4, 4, 4, 4], // PLAYER 1 PITS
    [4, 4, 4, 4, 4, 4], // PLAYER 2 PITS
    [0, 0], // BOTH PLAYER STORES ARE INITIALLY EMPTY
  ];
  stores.forEach(store => (store.textContent = "0"));
  render();
}

function render() {
  renderBoard();
  renderMessage();
}

async function handlePlayerChoice(event) {
  if (isAnimating) return;
  const pit = event.target;
  const player = parseInt(pit.dataset.player);
  const pitIndex = parseInt(pit.dataset.pit);

  if (player !== currentPlayer) return;

  let stonesInHand = board[player - 1][pitIndex];
  board[player - 1][pitIndex] = 0;
  renderBoard();

  let currentPit = pitIndex;
  let extraTurn = false;
  isAnimating = true;
  while (stonesInHand > 0) {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    currentPit = (currentPit + 1) % (2 * NUM_PITS + 1);

    if (currentPit === NUM_PITS && player !== currentPlayer) {
      // Skip the opponent's store
      currentPit = (currentPit + 1) % (2 * NUM_PITS + 1);
    }

    if (currentPit === NUM_PITS) {
      const currentStoreIndex = player - 1;
      stores[currentStoreIndex].textContent = parseInt(stores[currentStoreIndex].textContent) + 1;
      stonesInHand--;

      if (stonesInHand === 0) {
        extraTurn = true;
      }
    } else {
      const currentRow = Math.floor(currentPit / NUM_PITS);
      const currentPitIndex = currentPit % NUM_PITS;
      board[currentRow][currentPitIndex]++;
      stonesInHand--;
      renderBoard();
    }
  }

  if (isGameOver()) {
    endGame();
  } else if (!extraTurn) {
    currentPlayer = 3 - currentPlayer;
    renderMessage();
  }
}

function renderBoard() {
  pits.forEach((pit, index) => {
    const player = parseInt(pit.dataset.player);
    const pitIndex = parseInt(pit.dataset.pit);
    pit.textContent = board[player - 1][pitIndex];
  });
}

function renderMessage() {
  turnMsg.textContent = `Player ${currentPlayer}'s Turn`;
}

function isGameOver() {
  const storeSeeds = stores.map(store => parseInt(store.textContent));
  return board.every(playerPits => playerPits.every(pit => pit === 0)) || storeSeeds.some(seeds => seeds > 24);
}

function endGame() {
  const storeSeeds = stores.map(store => parseInt(store.textContent));
  if (storeSeeds[0] > storeSeeds[1]) {
    winner = 1;
  } else if (storeSeeds[0] < storeSeeds[1]) {
    winner = 2;
  } else {
    winner = "Tie";
  }
  turnMsg.textContent = `Game Over! ${winner === "Tie" ? "It's a Tie!" : "Player " + winner + " Wins!"}`;
}