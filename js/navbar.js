import { getCurrentUser, signOutCurrentUser } from "./users.js";
import { showAlert, removeAlert } from "./alert.js";

const signLink = document.getElementById("sign-link");

function signLinkAction() {
  const currentUser = getCurrentUser();
  if (currentUser != null) {
    signLink.innerHTML = '<i class="fa-solid fa-user"></i> Sign Out';
    signLink.href = "sign-out.html";
  } else {
    signLink.innerHTML = '<i class="fa-solid fa-user"></i> Sign In';
    signLink.href = "sign-in.html";
  }
}

document.addEventListener("DOMContentLoaded", signLinkAction);
