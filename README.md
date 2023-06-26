# Mancala

## Live link
[Mancala](https://mxrgxr.github.io/Mancala/)
---

### Overview

This project is a browser-based implementation of the classic board game Mancala. The objective of the game is to collect as many stones in your store as possible. The player with the most stones in their store at the end of the game wins.
---

### How to Play

1. The game board consists of two rows of six pits and a store for each player.
2. Each player starts with 4 stones in each of their pits.
3. Players take turns choosing a pit on their side of the board, picking up all the stones in that pit, and distributing them counterclockwise into the following pits and their own store.
4. If the last stone is placed in the player's store, they get an extra turn.
5. The game ends when either player has no more stones in their six pits. The remaining stones go to the other player's store.
6. The winner is the player with the most stones in their store.
---

### Wireframe
<img src="https://i.imgur.com/2Jzs3ys.png" alt="">
---

### Project Preview
<img src="https://i.imgur.com/J7W2zav.png" alt="">
---

### Technologies Used
![HTML Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Visual Studio Code](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) 
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white) 
---

### Learning Objectives

- Gain a deeper understanding of data-oriented programming concepts
- Learn how to implement game logic using JavaScript
- Apply best practices in HTML, CSS, and JavaScript
---

### Technical Concepts

- Data structures used for representing the game state
- Algorithms for determining valid moves and game outcomes
- Techniques for handling user input and updating the game board
---

### Code Structure

The code is organized into three main files:

- `index.html`: Contains the HTML structure of the game board, including pits, stores, and reset button.
- `style.css`: Defines the styling and layout of the game board, including fonts, colors, and background images.
- `script.js`: Contains the JavaScript logic for the game, including state variables, event listeners, and game functions.
---
#### Key Functions

- `initialize()`: Sets up the initial game state, including the board and current player.
- `render()`: Updates the game board and message display based on the current game state.
- `handlePlayerChoice(event)`: Handles a player's pit selection and performs the appropriate game actions.
- `isGameOver()`: Checks if the game is over based on the number of seeds in each player's store.
- `endGame()`: Determines the winner and displays the game over message.

## Code Preview
```js
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
```

### Stretch Goals
- [] Implement continuous stone distribution
- [] Implement Mancala capture logic
- [] Visual representation of stones
- [] Animate gameplay as player progresses around the board

#### Resources Used
[Fonts](https://johndavidmaza.gumroad.com/)