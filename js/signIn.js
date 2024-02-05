// File: js/signIn.js

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector("#sign-in");

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const signInUsername = document.querySelector("#signInUsername").value;
    const signInPassword = document.querySelector("#signInPassword").value;

    // Retrieve user from local storage
    const storedUserString = localStorage.getItem("currentUser");

    if (storedUserString) {
      // Parse stored user JSON string
      const storedUser = JSON.parse(storedUserString);

      // Check credentials
      if (
        signInUsername === storedUser.username &&
        signInPassword === storedUser.password
      ) {
        showAlert("Log in successful", "success");
        // Optionally, redirect to another page
        // window.location.href = 'index.html';
        sleep(1000);
        window.location.href = "index.html";
      } else {
        // alert("Invalid username or password");
        showAlert("Invalid username or password", "danger");
      }
    } else {
      // alert("No user found. Please sign up.");
      showAlert("No user found. Please sign up.", "info");
    }
  });
});
