import { getUserByUserName, setCurrentUser } from "./users.js";
import { showAlert, removeAlert } from "./alert.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector("#sign-in");
  const maxLoginAttempts = 3; // Maximum number of login attempts allowed
  const blockDuration = 60000; // Block duration in milliseconds (e.g., 1 minute)

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const signInUsername = document.querySelector("#signInUsername").value;
    const signInPassword = document.querySelector("#signInPassword").value;

    // Retrieve user from local storage
    const user = getUserByUserName(signInUsername);

    if (user != null) {
      // Check if the user is blocked
      const blockedUntil = localStorage.getItem("blockedUntil");
      if (blockedUntil && Date.now() < parseInt(blockedUntil)) {
        // Calculate remaining time until the block expires
        const remainingTime = parseInt(blockedUntil) - Date.now();
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        const formattedTime = `${minutes} minutes and ${seconds} seconds`;

        // User is blocked
        removeAlert();
        showAlert(
          `Too many unsuccessful login attempts. Try again in ${formattedTime}.`,
          "danger"
        );
        return;
      }

      // Check credentials
      if (signInUsername === user.name && signInPassword === user.password) {
        removeAlert();
        showAlert("Log in successful", "success");
        // Reset failed login attempts
        localStorage.removeItem("failedLoginAttempts");
        // Optionally, redirect to another page
        setCurrentUser(user);
        window.location.href = "index.html";
      } else {
        // Increment failed login attempts
        let failedAttempts = localStorage.getItem("failedLoginAttempts") || 0;
        failedAttempts++;
        const attemptsLeft = maxLoginAttempts - failedAttempts;
        localStorage.setItem("failedLoginAttempts", failedAttempts);

        // Show alert with remaining attempts
        removeAlert();
        showAlert(
          `Invalid username or password. ${attemptsLeft} attempt(s) left.`,
          "danger"
        );

        // Check if maximum login attempts reached
        if (failedAttempts >= maxLoginAttempts) {
          // Block user for a set duration
          localStorage.setItem("blockedUntil", Date.now() + blockDuration);
          // Calculate remaining time until the block expires
          const remainingTime = blockDuration;
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          const formattedTime = `${minutes} minutes and ${seconds} seconds`;
    
          removeAlert();
          showAlert(
            `Too many unsuccessful login attempts. You are blocked for ${formattedTime}.`,
            "danger"
          );
        }
      }
    } else {
      removeAlert();
      showAlert("No user found. Please sign up.", "info");
    }
  });
});
