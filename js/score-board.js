import { getUsers } from "./users.js";

const tableBody = document.getElementById("score-broad-body");

function createRow(id, username, game, score) {
  // Create a table row element
  var row = document.createElement("tr");

  var numberCell = document.createElement("th");
  numberCell.textContent = id;
  row.appendChild(numberCell);
  // Create and append table data elements for username, game, and score
  var usernameCell = document.createElement("td");
  usernameCell.textContent = username;
  row.appendChild(usernameCell);

  var gameCell = document.createElement("td");
  gameCell.textContent = game;
  row.appendChild(gameCell);

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  row.appendChild(scoreCell);

  // Return the created row
  return row;
}

function getUsersTable() {
  const users = getUsers().sort((a, b) => a.score > b.score);

  let id = 1;
  users.forEach((user) => {
    const row = createRow(id, user.name, "Hopping Dino", user.score);
    tableBody.appendChild(row);
    id += 1;
  });
}

getUsersTable();
