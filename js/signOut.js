// Import the signOutCurrentUser function from users.js file
import { signOutCurrentUser } from "./users.js";

// Add an event listener to execute code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the sign-out form
  const signInForm = document.querySelector("#sign-out");

  // Add an event listener to the sign-out form for form submission
  signInForm.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Call the signOutCurrentUser function to sign out the current user
    signOutCurrentUser();

    // Redirect to the index.html page after signing out
    window.location.href = "index.html";
  });
});
