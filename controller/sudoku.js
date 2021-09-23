const solution = [
  [8, 2, 7, 1, 5, 4, 3, 9, 6],
  [9, 6, 5, 3, 2, 7, 1, 4, 8],
  [3, 4, 1, 6, 8, 9, 7, 5, 2],
  [5, 9, 3, 4, 6, 8, 2, 7, 1],
  [4, 7, 2, 5, 1, 3, 6, 8, 9],
  [6, 1, 8, 9, 7, 2, 4, 3, 5],
  [7, 8, 6, 2, 3, 5, 9, 1, 4],
  [1, 5, 4, 7, 9, 6, 8, 2, 3],
  [2, 3, 9, 8, 4, 1, 5, 6, 7],
];
const userTable = [[], [], [], [], [], [], [], [], []];
let selectedI = -1;
let selectedJ = -1;

/**
 * creates the table that the user interacts with
 */
function createUserTable() {
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      userTable[i][j] = solution[i][j];
    }
  }

  let missingCells = 27;
  while (missingCells > 0) {
    const randI = Math.floor(Math.random() * 9);
    const randJ = Math.floor(Math.random() * 9);

    if (userTable[randI][randJ] !== 0) {
      userTable[randI][randJ] = 0;
      --missingCells;
    }
  }
}

/**
 * shows the table on the screen
 */
function drawTable() {
  createUserTable();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const el = document.createElement('div');

      el.id = '' + i + j;
      if (userTable[i][j] !== 0) {
        el.innerHTML = userTable[i][j];
      }
      el.className = 'cell';
      el.style.gridRowStart = i + 1;
      el.style.gridColumnStart = j + 1;
      if (userTable[i][j] === 0) {
        el.style.backgroundColor = '#a8bdbc';
      }

      // selects the cell where the user clicked
      el.addEventListener('click', function() {
        if (userTable[i][j] == 0) {
          if (selectedI !== -1 && selectedJ !== -1) {
            document.getElementById('' + selectedI + selectedJ)
                .style.backgroundColor = '#a8bdbc';
          }
          el.style.backgroundColor = '#e63535';
          selectedI = i;
          selectedJ = j;
        }
      });

      document.getElementById('mt').appendChild(el);
    }
  }
}

/**
 * the buttons the user interacts with in order to make a move on the screen
 */
function drawChoiceButtons() {
  let numberToShow = 9;
  for (let i = 1; i <= 3; ++i) {
    for (let j = 3; j >= 1; --j) {
      const el = document.createElement('button');

      el.innerHTML = numberToShow;
      el.style.gridRowStart = i;
      el.style.gridColumnStart = j;
      el.id = numberToShow;

      // updates the selected cell with the number pressed on the screen.
      el.addEventListener('click', function() {
        if (selectedI != -1 && selectedJ != -1) {
          userTable[selectedI][selectedJ] = el.id;
          document.getElementById('' + selectedI + selectedJ)
              .innerHTML = el.id;
        }
      });

      document.getElementById('choices').appendChild(el);
      --numberToShow;
    }
  }
}

/**
 * makes a button which checks whether
 *  the current state of table is the correct solution
 */
function drawCheckSolution() {
  const el = document.createElement('button');

  el.style.gridColumnStart = 1;
  el.style.gridColumnEnd = 4;
  el.style.gridRowStart = 4;
  el.innerHTML = 'CHECK SOLUTION';
  el.style.backgroundColor = '#e63535';

  el.addEventListener('click', function() {
    if (checkUserSolution() == true) {
      document.getElementById('outcome').innerHTML = 'CORRECT SOLUTION';
      document.getElementById('outcome').style.color = '#43b07d';
    } else {
      document.getElementById('outcome').innerHTML = 'WRONG SOLUTION';
      document.getElementById('outcome').style.color = '#e63535';
    }
  });

  document.getElementById('choices').appendChild(el);
}

/**
 * Checks if the user's table is the same with the correct solution
 * @return {boolean} true if the user's table is the same with the solution
 *  false otherwise
 */
function checkUserSolution() {
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (solution[i][j] != userTable[i][j]) {
        return false;
      }
    }
  }

  return true;
}

drawTable();
drawChoiceButtons();
drawCheckSolution();
