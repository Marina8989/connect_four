/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7; // x
var HEIGHT = 6; // y

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < HEIGHT; y++) {
     board.push(Array.from({length: WIDTH}));
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // TODO: add comment for this code
  //create a new html element tr
  var top = document.createElement("tr");
  //set id attribute to it 
  top.setAttribute("id", "column-top");
  //add event listener and make it clickable with the callback function
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    //create a new html el to hold the data in
    var headCell = document.createElement("td");
    //set id attribute to it so it can have the border and bg color on hover
    headCell.setAttribute("id", x);
    //append it to the previously created element above
    top.append(headCell);
  }
  //append table row to the top of the board
  htmlBoard.append(top);

  // TODO: add comment for this code
  //loop through each column
  for (var y = 0; y < HEIGHT; y++) {
    //after each loop create a new row and assign it to new html el tr
    const row = document.createElement("tr");
   //loop through each row
    for (var x = 0; x < WIDTH; x++) {
      //each time create a new table data el
      const cell = document.createElement("td");
      //set an attribute to each of the new td to equal to id, so they will be displayed properly on screen
      cell.setAttribute("id", `${y}-${x}`);
      //append each cell to the row depending on the id it got
      row.append(cell);
    }
    //append that row with all cells to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //loop tthrough height of the column from max to min.
  for(let y = HEIGHT - 1; y >= 0; y--) {
    //if it is not truthy
      if(!board[y][x]) {
        //return top empty y
        return y;
      }
  }
  //else return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // create a new html element div
  const newDiv = document.createElement('div');
  //add classes to make it functional
  newDiv.classList.add('piece');
  newDiv.classList.add(`player${currPlayer}`);
  //position the piece on top of the board
  newDiv.style.top = -30 *(y + 2);

  // get the elelemnt at its location
  const location = document.getElementById(`${y}-${x}`);
  //append the created piece to the location
  location.append(newDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
