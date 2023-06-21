// when player clicks slot
    // 1. empty clicked slot
    // 2. loop move 1 space to right drop 1 token as long as last move was in slot with more tokens than 1
        // 2a. only place in own store, if passing over opponent store skip
    // 3. possible last moves
        // 3a. if player runs out of tokens after own store, player gains new turn
        // 3b. if player runs out of tokens in opponent side, switch turns
        // 3c. if player runs out of tokens in own side && opponent has tokens directly across, collect opponent tokens && last token player placed
        // 3d. if player runs out of tokens in own side && opponent doesn't have tokens directly across, switch turns
// if any tokens left in 12 playable slots, game is in progress
    // 1. when no tokens in playable slots, check winner
        // 1a. check winner function counts tokens in each player's stores
        // 1b. player with > tokens wins
        // 1c. enable reset button functionality
// listen for player click on reset button to reset board and rerun the game

/*----- constants -----*/
const PLAYERS = {
    '0': 'none',
    '1': 'Player 1',
    '-1': 'Player 2'
}

/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/
const turnMessage = document.querySelector('h1');
const resetBtn = document.querySelector('button');
const player1Pits = Array.from(document.getElementById('player1').querySelectorAll('.pit'));
const player2Pits = Array.from(document.getElementById('player2').querySelectorAll('.pit'));
const player1Store = document.getElementById('player1-store');
const player2Store = document.getElementById('player2-store');

/*----- event listeners -----*/
player1Pits.forEach(pit => {
    pit.addEventListener('click', handlePlayerChoice);
});
player2Pits.forEach(pit => {
    pit.addEventListener('click', handlePlayerChoice);
});
resetBtn.addEventListener('click', initialize);

/*----- functions -----*/
initialize();

function initialize(){
    board = [
        [4, 4, 4, 4, 4, 4], //player 1 pits
        [4, 4, 4, 4, 4, 4], //player 2 pits
        [0, 0] //player stores
    ];
    turn = 1;
    winner = null;
    render();
}

function render(){
    renderBoard();
    renderMessage();
}

function renderBoard(){
    player1Pits.forEach((pit, i) => {
        pit.innerHTML = board[0][i];
    });
    player2Pits.forEach((pit, i) => {
        pit.innerHTML = board[1][i];
    });
    player1Store.innerHTML = board[2][0];
    player2Store.innerHTML = board[2][1];
}

function renderMessage(){

}

function handlePlayerChoice(event){
    const selectedPit = event.target;
    const player = selectedPit.getAttribute('data-player');
    const pitIdx = selectedPit.getAttribute('data-pit');
    board[player][pitIdx] = 0;
    moveStones();
    checkLastMove();
    winner = getWinner();
    render();
}

function moveStones(){
    const playerPits = board[turn === 1 ? 0 : 1];
    const currentPlayerStore = board[2][turn === 1 ? 0 : 1];

    let movingStones = playerPits[pitIdx];
    let currentPitIdx = pitIdx;

    while (movingStones > 0) {
        currentPitIdx = (currentPitIdx + 1) % playerPits.length;
        if (currentPitIdx === (turn === 1 ? player2Store : player1Store)) {
            currentPitIdx = (currentPitIdx + 1) % playerPits.length;
        }
        playerPits[currentPitIdx] += 1;
        movingStones--;
    }
}

function checkLastMove(){

}

function getWinner(){
    
}