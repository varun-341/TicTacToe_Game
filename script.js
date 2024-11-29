let currentPlayer = "X"; // X starts the game
let board = ["", "", "", "", "", "", "", "", ""]; // The board is represented as an array
let gameOver = false; // To check if the game is over

// Function to handle clicks on each cell
function handleClick(cellIndex) {
    if (gameOver || board[cellIndex] !== "") {
        return; // Ignore the click if the game is over or the cell is already filled
    }
    // Update the board and the UI
    board[cellIndex] = currentPlayer;
    document.getElementById(`cell${cellIndex + 1}`).innerText = currentPlayer;
    
    // Check for a winner after each move
    if (checkWinner()) {
        document.getElementById("head").innerText = `Winner is: ${currentPlayer}`;
        gameOver = true; // Stop the game
        return;
    }
    
    // Check for a draw
    if (board.every(cell => cell !== "")) {
        document.getElementById("head").innerText = "It's a draw!";
        gameOver = true;
        return;
    }
    
    // Switch the player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check if there is a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to restart the game
function restart() {
    currentPlayer = "X"; // X starts the game again
    board = ["", "", "", "", "", "", "", "", ""]; // Reset the board
    gameOver = false; // Reset game over flag
    document.getElementById("head").innerText = "Winner is: ";
    
    // Clear all cells
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`cell${i}`).innerText = "";
    }
}

// Attach the handleClick function to each cell
for (let i = 0; i < 9; i++) {
    document.getElementById(`cell${i + 1}`).addEventListener("click", () => handleClick(i));
}