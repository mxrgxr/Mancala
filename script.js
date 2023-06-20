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


/*----- state variables -----*/
let turn;
let board;
let winner;

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
initialize();

function initialize(){
    board = [
        [4, 4, 4, 4, 4, 4], //player 1 pits
        [4, 4, 4, 4, 4, 4], //player 2 pits
        [0, 0]
    ];
    turn = 1;
    winner = null;
}