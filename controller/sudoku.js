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
const userTable = solution;
let selectedI = -1;
let selectedJ = -1;

/**
 * 
 */
function createUserTable() {
  let missingCells = 27;
  while (missingCells > 0) {
    const randI = Math.floor(Math.random() * 9);
    const randJ = Math.floor(Math.random() * 9);

    if (userTable[randI][randJ] != '') {
      userTable[randI][randJ] = '';
      --missingCells;
    }
  }
}

/**
 * 
 */
function drawTable() {
  createUserTable();

  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      const el = document.createElement('div');
      el.id = '' + i + j;
      el.innerHTML = userTable[i][j];
      el.className = 'cell';
      el.style.gridRowStart = i + 1;
      el.style.gridColumnStart = j + 1;
      if (userTable[i][j] == '') {
        el.style.backgroundColor = 'rgba(128, 128, 128, 0.678)';
      }
      el.addEventListener('click', function() {
        if (userTable[i][j] == '') {
          if (selectedI !== -1 && selectedJ !== -1) {
            document.getElementById('' + selectedI + selectedJ)
                .style.backgroundColor = 'rgba(128, 128, 128, 0.678)';
          }
          el.style.backgroundColor = 'red';
          selectedI = i;
          selectedJ = j;
        }
      });
      document.getElementById('mt').appendChild(el);
    }
  }
}

/**
 * 
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
      document.getElementById('choices').appendChild(el);
      --numberToShow;
    }
  }

  const el = document.createElement('button');
  el.style.gridColumnStart = 1;
  el.style.gridColumnEnd = 4;
  el.style.gridRowStart = 4;
  el.innerHTML = 'CHECK SOLUTION';
  el.style.backgroundColor = 'red';
  document.getElementById('choices').appendChild(el);
}

drawTable();
drawChoiceButtons();
