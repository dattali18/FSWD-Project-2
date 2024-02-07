// File: js/signUp.js
import { createUser } from "./users.js";
import { showAlert, removeAlert } from "./alert.js";

document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector("#sign-up");

  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confPassword = document.querySelector("#confpassword").value;

    // Validate form fields
    if (username && email && password && confPassword == password) {
      // Create user object
      let success = createUser(username, email, password);
      console.log(success);
      // Optionally, redirect to another page
      // window.location.href = 'index.html';
      if (success) {
        window.location.href = "sign-in.html";
      } else {
        removeAlert();
        showAlert("User name already taken", "danger");
      }
    } else {
      removeAlert();
      showAlert("Please fill in all fields", "danger");
    }
  });
});
