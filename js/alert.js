const alertBanner = document.getElementById("alert-banner");
const alertText = document.getElementById("alert-text");
const alertIcon = document.getElementById("alert-icon");

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

function showAlert(text, type) {
  alertBanner.classList.toggle("alert-show");
  alertBanner.classList.toggle(alertTypes[type]);

  alertText.innerText = text;

  alertIcon.classList.toggle(alertIconsTypes[type]);
}

function removeAlert() {
    alertBanner.classList.remove("alert-show");

    alertBanner.classList.remove("alert-info");
    alertBanner.classList.remove("alert-danger");
    alertBanner.classList.remove("alert-success");

    alertIcon.classList.remove("fa-circle-info");
    alertIcon.classList.remove("fa-triangle-exclamation");
    alertIcon.classList.remove("fa-circle-check");
}

