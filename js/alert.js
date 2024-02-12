// Get reference to the alert banner, text, and icon elements
const alertBanner = document.getElementById("alert-banner");
const alertText = document.getElementById("alert-text");
const alertIcon = document.getElementById("alert-icon");

// Define mappings for different alert icon types and alert types
const alertIconsTypes = {
  info: "fa-circle-info",
  danger: "fa-triangle-exclamation",
  success: "fa-circle-check",
};

const alertTypes = {
  info: "alert-info",
  danger: "alert-danger",
  success: "alert-success",
};

// Function to show an alert with specified text and type
function showAlert(text, type) {
  // Toggle the visibility of the alert banner and set its type
  alertBanner.classList.toggle("alert-show");
  alertBanner.classList.toggle(alertTypes[type]);

  // Set the text of the alert
  alertText.innerText = text;

  // Toggle the alert icon based on the type
  alertIcon.classList.toggle(alertIconsTypes[type]);
}

// Function to remove the alert banner and reset its styles
function removeAlert() {
  alertBanner.classList.remove("alert-show");

  // Remove all alert types classes
  alertBanner.classList.remove("alert-info");
  alertBanner.classList.remove("alert-danger");
  alertBanner.classList.remove("alert-success");

  // Remove all alert icon classes
  alertIcon.classList.remove("fa-circle-info");
  alertIcon.classList.remove("fa-triangle-exclamation");
  alertIcon.classList.remove("fa-circle-check");
}

// Get reference to the close button and attach a click event listener to remove the alert
const closeBtn = document.getElementById("alert-close");
closeBtn.addEventListener("click", removeAlert);

// Export showAlert and removeAlert functions
export { showAlert, removeAlert };
