let currentPlayer = "X";
let board;
let gameMode;

function startGame(mode) {
    gameMode = mode;
    board = ["", "", "", "", "", "", "", "", ""];
    document.getElementById('gameMode').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('playerTurn').innerText = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = board[i];
        cell.onclick = () => cellClick(i);
        boardElement.appendChild(cell);
    }
}

function cellClick(index) {
    if (board[index] === "" && !checkWinner()) {
        board[index] = currentPlayer;
        renderBoard();
        if (!checkWinner() && !checkDraw()) {
            if (gameMode === 1) {
                makeAIMove();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.getElementById('playerTurn').innerText = `Player ${currentPlayer}'s turn`;
            }
        }
    }
}

function makeAIMove() {
    let preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    let moveMade = false;

    for (let i = 0; i < preferredMoves.length; i++) {
        if (board[preferredMoves[i]] === "") {
            board[preferredMoves[i]] = currentPlayer === "X" ? "O" : "X";
            moveMade = true;
            break;
        }
    }

    if (!moveMade) {
        let emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        board[emptyCells[randomIndex]] = currentPlayer === "X" ? "O" : "X";
    }

    renderBoard();
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightCells([a, b, c]);
            setTimeout(() => { alert(`${board[a]} wins!`); resetGame(); }, 200);
            return true;
        }
    }

    return false;
}

function highlightCells(cells) {
    cells.forEach(index => {
        const boardElement = document.getElementById('board');
        boardElement.children[index].style.backgroundColor = '#90ee90'; // Light green
    });
}

function checkDraw() {
    if (board.every(cell => cell !== "")) {
        setTimeout(() => { alert("It's a draw!"); resetGame(); }, 200);
        return true;
    }
    return false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    document.getElementById('playerTurn').innerText = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

function goBack() {
    document.getElementById('gameMode').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
}
