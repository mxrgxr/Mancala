// Start with 4 tokens per slot (can be represented with numbers or token icons and reveal number when player hovers on slot)
// Listen for player click on slot and start gameplay from there
// Chosen slot is now empty, start gameplay by placing 1 token in each slot to the right of starting point
    // Skip opponents store when moving counterclockwise around board
    // Repeat if landing in slot with tokens regardless of side on board
        // If no tokens && turn ends on player side && opponent slot directly across has tokens: collect opponent tokens and the one player just put down
        // If no tokens && ((turn ends on player side && opponent has no tokens directly across) || turn ends on opponents side): forfeit turn
    // If last move ends in own store: same player receives another turn else: switch player turn 
// If no more tokens in 12 player slots: check for winner (highest count of tokens in store)&& enable reset button
// Listen for player click on reset button and reset board