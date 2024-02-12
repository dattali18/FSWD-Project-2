// Import showAlert and removeAlert functions from alert.js file
import { showAlert, removeAlert } from "./alert.js";

// Initialize game variables
let turn = "X"; // Player turn (X or O)
let winner = null; // Winner of the game (X, O, or null)
let board = ["", "", "", "", "", "", "", "", ""]; // Game board

// Function to update game information display
function updateInfo() {
  document.getElementById("info").innerHTML = "It's " + turn + "'s turn";
}

// Function to check if there is a winner
function checkWin() {
  // Define winning combinations
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Iterate through winning combinations
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    // Check if the current combination is a winning one
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return true;
    }
  }

  return false;
}

// Function to check if the game is tied
function checkTie() {
  // Check if the board contains no empty cells
  return !board.includes("");
}

// Function to handle click events on the game board
function handleClick(e) {
  const id = e.target.id;
  // Check if the cell is already filled or there is already a winner
  if (board[id] || winner) {
    return;
  }

  // Update the game board with the current player's symbol
  board[id] = turn;
  e.target.innerHTML = turn;
  // Check for a winner
  if (checkWin()) {
    removeAlert();
    // Show the winner alert
    showAlert(winner + " won!", "success");
    return;
  }

  // Check for a tie
  if (checkTie()) {
    removeAlert();
    // Show the tie alert
    showAlert("It's a tie!", "danger");
    return;
  }

  // Switch the turn to the other player
  turn = turn === "X" ? "O" : "X";
  removeAlert();
  // Update the game information display
  showAlert("It's " + turn + "'s turn", "info");
}

// Function to restart the game
function restartGame() {
  // Reset game variables
  turn = "X";
  winner = null;
  board = ["", "", "", "", "", "", "", "", ""];
  // Clear the game board
  document.querySelectorAll("td").forEach((td) => (td.innerHTML = ""));
  // Update game information display
  showAlert("It's " + turn + "'s turn", "info");
}

// Add event listener to the restart button to restart the game
document.getElementById("restart").addEventListener("click", restartGame);

// Add event listeners to all cells of the game board to handle clicks
document
  .querySelectorAll("td")
  .forEach((td) => td.addEventListener("click", handleClick));

// Show initial game information
showAlert("It's " + turn + "'s turn", "info");
