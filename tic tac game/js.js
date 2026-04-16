const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let cells = Array(9).fill(null);
let isGameOver = false;

function startGame() {
  cells = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  statusText.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cellDiv);
  });
}

function handleCellClick(index) {
  if (cells[index] || isGameOver) return;
  cells[index] = currentPlayer;
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    isGameOver = true;
    return;
  }
  if (!cells.includes(null)) {
    statusText.textContent = "It's a Draw! 🤝";
    isGameOver = true;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

startGame();
