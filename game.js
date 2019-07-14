// Game State
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
const squareCount = 9;
const squares = document.getElementsByClassName('square');
let difficulty = 'beginner';
let gameOver = false;

const setMessageBox = caption => {};

const checkForWinCondition = marker => {};

const opponentMove = () => {};

const squareIsOpen = square => {};

const checkForDraw = () => {};

// Game Logic
const chooseSquare = () => {
  difficulty = document.getElementById('difficulty').value;
  if (!gameOver) {
    setMessageBox('Pick a square!');
    const id = this.getAttribute('id');
    const square = document.getElementById(id);
    if (squareIsOpen(square)) {
      square.innerHTML = 'X';
      const win = checkForWinCondition('X');
      if (!win) {
        opponentMove();
        const lost = checkForWinCondition('O');
        if (!lost) {
          const draw = checkForDraw();
          if (draw) {
            gameOver = true;
            setMessageBox("It's a draw!");
          }
        } else {
          gameOver = true;
          highlightWinningSquares(lost, 'rgb(42,178,72)');
          setMessageBox('You lost!');
        }
      } else {
        gameOver = true;
        highlightWinningSquares(win, 'rgb(42,178,72)');
        setMessageBox('You won!');
      }
    } else {
      setMessageBox('That square is already taken!');
    }
  }
};
