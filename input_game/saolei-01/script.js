const boardSize = 9;
const mineCount = 10;
let board = [];
let revealedCells = 0;
let gameActive = true;

function initBoard() {
    for (let i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize).fill(0);
    }
    placeMines();
    calculateAdjacentMines();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        let x = Math.floor(Math.random() * boardSize);
        let y = Math.floor(Math.random() * boardSize);
        if (board[x][y] !== -1) {
            board[x][y] = -1;
            minesPlaced++;
        }
    }
}

function calculateAdjacentMines() {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (board[x][y] !== -1) {
                let count = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (isValid(x + dx, y + dy) && board[x + dx][y + dy] === -1) {
                            count++;
                        }
                    }
                }
                board[x][y] = count;
            }
        }
    }
}

function isValid(x, y) {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

function revealCell(x, y) {
    if (!gameActive || board[x][y] === -2) return;
    if (board[x][y] === -1) {
        gameOver();
        return;
    }
    board[x][y] = -2; // Revealed cell
    revealedCells++;
    if (board[x][y] === 0) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(x + dx, y + dy);
            }
        }
    }
    updateDisplay();
    if (revealedCells === boardSize * boardSize - mineCount) {
        victory();
    }
}

function updateDisplay() {
    const container = document.getElementById('game-board');
    container.innerHTML = '';
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[x][y] === -2) {
                cell.textContent = board[x][y] === 0 ? '' : board[x][y];
            } else if (board[x][y] === -1) {
                cell.textContent = '💣';
            }
            container.appendChild(cell);
        }
    }
}

function resetGame() {
    board = [];
    revealedCells = 0;
    gameActive = true;
    initBoard();
    updateDisplay();
}

function gameOver() {
    gameActive = false;
    alert("游戏结束！");
}

function victory() {
    gameActive = false;
    alert("恭喜胜利！");
}

initBoard();
updateDisplay();