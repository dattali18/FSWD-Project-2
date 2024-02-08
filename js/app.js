import { showAlert, removeAlert } from "./alert.js";
import { getCurrentUser, setCurrentUser } from "./users.js";

const playGame1Btn = document.getElementById("play-game-1");
const playGame2Btn = document.getElementById("play-game-2");

playGame1Btn.addEventListener("click", checkUserIsSignedIn("tic-tac-toe.html"));
playGame2Btn.addEventListener("click", checkUserIsSignedIn("game-2.html"));

function checkUserIsSignedIn(gameUrl) {
  return function() {
    const currentUser = getCurrentUser();
    if (currentUser == null) {
      removeAlert();
      showAlert("Please sign in before starting a game", "info");
    } else {
      window.location.href = gameUrl;
    }
  };
}

