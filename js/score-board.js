import { getUsers } from "./users.js";

const tableBody = document.getElementById("score-broad-body");

function createRow(id, username, game, score) {
  var row = document.createElement("tr");

  var numberCell = document.createElement("th");
  numberCell.textContent = id;
  row.appendChild(numberCell);
  var usernameCell = document.createElement("td");
  usernameCell.textContent = username;
  row.appendChild(usernameCell);

  var gameCell = document.createElement("td");
  gameCell.textContent = game;
  row.appendChild(gameCell);

  var scoreCell = document.createElement("td");
  scoreCell.textContent = score;
  row.appendChild(scoreCell);

  return row;
}

function getUsersTable() {
  const users = getUsers().sort((a, b) => b.score - a.score);

  let id = 1;
  users.forEach((user) => {
    const row = createRow(id, user.name, "Hopping Dino", user.score);

    if (id === 1) {   //displays the top 3 in gold silver and bronze
      row.classList.add("gold");
    } else if (id === 2) {
      row.classList.add("silver");
    } else if (id === 3) {
      row.classList.add("bronze");
    }

    tableBody.appendChild(row);
    id += 1;
  });
}

getUsersTable();
