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

const setMessageBox = caption => {
  const messageBox = document.getElementById('messageBox');
  messageBox.innerHTML = caption;
};

const resetGame = () => {
  gameOver = false;
  setMessageBox('Pick a square!');
  for (let id = 0; id < squareCount; id++) {
    const square = document.getElementById(id);
    square.innerHTML = '';
    square.style.backgroundColor = 'rgb(102,178,255)';
  }
};

const findClaimedSquares = marker => {
  const claimedSquares = [];
  let value;
  for (let id = 0; id < squareCount; id++) {
    value = document.getElementById(id).innerHTML;
    if (value == marker) {
      claimedSquares.push(id);
    }
  }
  return claimedSquares;
};

const checkForWinCondition = marker => {
  const claimedSquares = findClaimedSquares(marker);
  let win = false;
  for (let i = 0; i < winConditions.length; i++) {
    win = winConditions[i].every(
      element => claimedSquares.indexOf(element) > -1
    );
    if (win) {
      win = winConditions[i];
      break;
    }
  }
  return win;
};

// AI
const opponentMove = () => {
  if (difficulty === 'beginner') {
    makeMoveAtFirstAvailableSquare();
  } else {
  }
};

const makeMoveAtFirstAvailableSquare = () => {
  for (let id = 0; id < squareCount; id++) {
    square = document.getElementById(id);
    if (squareIsOpen(square)) {
      squareCount.innerHTML = 'O';
      break;
    }
  }
};

const squareIsOpen = square =>
  square.innerHTML !== 'X' && square.innerHTML !== 'O';

const checkForDraw = () => {
  let draw = true;
  for (let id = 0; id < squareCount; id++) {
    if (squareIsOpen(document.getElementById(id))) {
      draw = false;
      break;
    }
  }
  return draw;
};

// Game Logic
const chooseSquare = event => {
  difficulty = document.getElementById('difficulty').value;
  if (!gameOver) {
    setMessageBox('Pick a square!');
    id = event.target.id;
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
