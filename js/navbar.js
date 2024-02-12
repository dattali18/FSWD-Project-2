// Import getCurrentUser and signOutCurrentUser functions from users.js file
import { getCurrentUser, signOutCurrentUser } from "./users.js";

// Import showAlert and removeAlert functions from alert.js file
import { showAlert, removeAlert } from "./alert.js";

// Get reference to the sign-in/sign-out link element
const signLink = document.getElementById("sign-link");

// Function to determine the action of the sign-in/sign-out link based on the current user's status
function signLinkAction() {
  // Get the current user
  const currentUser = getCurrentUser();

  // Check if a user is signed in
  if (currentUser != null) {
    // If user is signed in, display "Sign Out" option and link to sign-out page
    signLink.innerHTML = '<i class="fa-solid fa-user"></i> Sign Out';
    signLink.href = "sign-out.html";
  } else {
    // If no user is signed in, display "Sign In" option and link to sign-in page
    signLink.innerHTML = '<i class="fa-solid fa-user"></i> Sign In';
    signLink.href = "sign-in.html";
  }
}

// Execute signLinkAction function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", signLinkAction);
