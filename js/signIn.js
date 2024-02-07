import { getUserByUserName, setCurrentUser } from "./users.js";
import { showAlert,removeAlert } from "./alert.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector("#sign-in");

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const signInUsername = document.querySelector("#signInUsername").value;
    const signInPassword = document.querySelector("#signInPassword").value;

    // Retrieve user from local storage
    const user = getUserByUserName(signInUsername);

    if (user != null) {
      // Parse stored user JSON string

      // Check credentials
      if (
        signInUsername === user.name &&
        signInPassword === user.password
      ) {
        removeAlert();
        showAlert("Log in successful", "success");
        // Optionally, redirect to another page
        setCurrentUser(user)
        window.location.href = "index.html";
      } else {
        // alert("Invalid username or password");
        removeAlert()
        showAlert("Invalid username or password", "danger");
      }
    } else {
      // alert("No user found. Please sign up.");
      removeAlert();
      showAlert("No user found. Please sign up.", "info");
    }
  });
});
