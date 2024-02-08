import { signOutCurrentUser} from "./users.js";

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector("#sign-out");

  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    signOutCurrentUser();
    window.location.href = "index.html";
  });
});
