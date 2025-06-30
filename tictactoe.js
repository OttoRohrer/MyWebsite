const sections = document.querySelectorAll("div");
let currentTurn = "O";
const sectionData = [];
for (let section of sections) {
  sectionData.push("");
}

function switchTurn(turn) {
  if (turn === "O") {
    return "X";
  }
  return "O";
}

function isWinner(board) {
  if (board[0] === board[4] && board[4] === board[8]) {
    if (board[0] !== "") {
      return true;
    }
  }
  if (board[2] === board[4] && board[4] === board[6]) {
    if (board[2] !== "") {
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      if (board[i] !== "") {
        return true;
      }
    }
    if (
      board[3 * i] === board[3 * i + 1] &&
      board[3 * i + 1] === board[3 * i + 2]
    ) {
      if (board[3 * i] !== "") {
        return true;
      }
    }
  }
  return false;
}

function isBoardFull(board) {
  return board.every((square) => square !== "");
}

function getWinningIndicies(board) {
  if (board[0] === board[4] && board[4] === board[8]) {
    if (board[0] !== "") {
      return [0, 4, 8];
    }
  }
  if (board[2] === board[4] && board[4] === board[6]) {
    if (board[2] !== "") {
      return [2, 4, 6];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      if (board[i] !== "") {
        return [i, i + 3, i + 6];
      }
    }
    if (
      board[3 * i] === board[3 * i + 1] &&
      board[3 * i + 1] === board[3 * i + 2]
    ) {
      if (board[3 * i] !== "") {
        return [3 * i, 3 * i + 1, 3 * i + 2];
      }
    }
  }
}

function game() {
  for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener("pointerdown", (event) => {
      if (sectionData[i] === "") {
        if (currentTurn === "O") {
          O = document.createElement("p");
          O.textContent = "o";
          O.style.fontSize = "20vmin";
          O.style.marginLeft = "30%";
          sections[i].appendChild(O);
        } else if (currentTurn === "X") {
          X = document.createElement("p");
          X.textContent = "x";
          X.style.fontSize = "20vmin";
          X.style.marginLeft = "30%";
          sections[i].appendChild(X);
        }
        sectionData[i] = currentTurn;
        currentTurn = switchTurn(currentTurn);
      }
      if (isWinner(sectionData) || isBoardFull(sectionData)) {
        if (isWinner(sectionData)) {
          const winningIndicies = getWinningIndicies(sectionData);
          sections[winningIndicies[0]].style.background = "purple";
          sections[winningIndicies[1]].style.background = "purple";
          sections[winningIndicies[2]].style.background = "purple";
          sections[winningIndicies[0]].style.color = "white";
          sections[winningIndicies[1]].style.color = "white";
          sections[winningIndicies[2]].style.color = "white";
        } else if (isBoardFull(sectionData)) {
          for (let square of sections) {
            square.style.background = "#ddd";
          }
        }
      }
    });
  }
}

game();
