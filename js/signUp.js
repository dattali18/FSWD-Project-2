// File: js/signUp.js

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
      const user = {
        username,
        email,
        password,
      };

      // Convert user object to JSON string
      const userString = JSON.stringify(user);

      // Store user in local storage
      localStorage.setItem("currentUser", userString);

      // Optionally, redirect to another page
      // window.location.href = 'index.html';
      window.location.href = "sign-in.html";
    } else {
      alert("Please fill in all fields");
    }
  });
});
