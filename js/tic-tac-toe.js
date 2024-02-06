let turn = "X";
let winner = null;
let board = ["", "", "", "", "", "", "", "", ""];

function updateInfo() {
  document.getElementById("info").innerHTML = "It's " + turn + "'s turn";
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      return true;
    }
  }

  return false;
}

function checkTie() {
  return !board.includes("");
}

function handleClick(e) {
  const id = e.target.id;
  if (board[id] || winner) {
    return;
  }

  board[id] = turn;
  e.target.innerHTML = turn;
  if (checkWin()) {
    document.getElementById("info").innerHTML = winner + " won!";
    return;
  }

  if (checkTie()) {
    document.getElementById("info").innerHTML = "It's a tie!";
    return;
  }

  turn = turn === "X" ? "O" : "X";
  updateInfo();
}

document
  .querySelectorAll("td")
  .forEach((td) => td.addEventListener("click", handleClick));
updateInfo();
