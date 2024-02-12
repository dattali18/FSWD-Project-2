// Import showAlert and removeAlert functions from alert.js file
import { showAlert, removeAlert } from "./alert.js";

// Import getCurrentUser and setCurrentUser functions from users.js file
import { getCurrentUser, setCurrentUser } from "./users.js";

// Get references to the play buttons for the games
const playGame1Btn = document.getElementById("play-game-1");
const playGame2Btn = document.getElementById("play-hopping-dino");

// Add event listeners to the play buttons
playGame1Btn.addEventListener("click", checkUserIsSignedIn("tic-tac-toe.html"));
playGame2Btn.addEventListener(
  "click",
  checkUserIsSignedIn("hopping-dino.html")
);

// Function to check if the user is signed in before starting a game
function checkUserIsSignedIn(gameUrl) {
  return function () {
    // Get the current user
    const currentUser = getCurrentUser();
    if (currentUser == null) {
      // If the user is not signed in, show an alert
      removeAlert();
      showAlert("Please sign in before starting a game", "info");
    } else {
      // If the user is signed in, redirect to the game URL
      window.location.href = gameUrl;
    }
  };
}
