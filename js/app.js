import { showAlert, removeAlert } from "./alert.js";
import { getCurrentUser, setCurrentUser } from "./users.js";

const playGame1Btn = document.getElementById("play-game-1");

playGame1Btn.addEventListener("click", checkUserIsSignedIn);

function checkUserIsSignedIn() {
  const currentUser = getCurrentUser();
  if (currentUser == null) {
    removeAlert();
    showAlert("Please sign in before starting a game", "info");
  } else {
    window.location.href = "tic-tac-toe.html";
  }
}
