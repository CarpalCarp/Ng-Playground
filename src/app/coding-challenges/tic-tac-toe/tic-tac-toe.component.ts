import { Component, input } from '@angular/core';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
  standalone: true
})

export class TicTacToeComponent {
  title = input<string>('');
  winnerStatus = ' ';
  gameOver = false;
  // A bit of complexity gets added because of @for() needing a unique property to track by which is why instead
  // of a 2D array of strings, an array of objects containing an array of objects is used
  emptyBoard = [
    { rowList: [{ colValue: '-', id: 1 }, { colValue: '-', id: 2 }, { colValue: '-', id: 3 }], id: 1 },
    { rowList: [{ colValue: '-', id: 4 }, { colValue: '-', id: 5 }, { colValue: '-', id: 6 }], id: 2 },
    { rowList: [{ colValue: '-', id: 7 }, { colValue: '-', id: 8 }, { colValue: '-', id: 9 }], id: 3 }
  ];
  ticTacGameBoard = structuredClone(this.emptyBoard);
  private xTurn = true;

  getToken(token: string, row: number, col: number) {
    if (!this.gameOver) {
      if (this.xTurn)
        this.ticTacGameBoard[row].rowList[col].colValue = 'X';
      else
        this.ticTacGameBoard[row].rowList[col].colValue = 'O';
      this.xTurn = !this.xTurn;

      this.gameOver = this.checkWinner();
    }
  }

  restart() {
    this.ticTacGameBoard = structuredClone(this.emptyBoard);
    this.gameOver = false;
    this.winnerStatus = ' ';
    this.xTurn = true;
  }

  private search(token: string, row: number, col: number, rowDirection: number, colDirection: number) {
    const rowList = this.ticTacGameBoard[row].rowList;
    const winningTokenCount = 2; // need 2 more of the same tokens to win
    for (let i = 0; i < winningTokenCount; i++) {
      // Depending on whether rowDir and colDir were a 1, -1 or a 0,
      // the game board will be traversed vertically, horizontally, forward diagonally or backward diagonally
      row += rowDirection;
      col += colDirection;

      // Follow constraints of game board so that search doesn't go out of bounds
      if (row < 0 || col < 0 || col > rowList.length)
        return false;

      if (rowList[col] && rowList[col].colValue === token)
        continue;
      else
        return false;
    }
    return true; // If the loop completes, a winner was found
  }

  private beginSearch(token: string, curRow: number, curCol: number) {
    let winnerFound = false;
    // perform these searches on each token
    // if a winner was found after the first search, there is no point in doing the next one
    winnerFound = this.search(token, curRow, curCol, -1, 0); // vertical search
    if (!winnerFound) { winnerFound = this.search(token, curRow, curCol, 0, 1); } // horizontal search
    if (!winnerFound) { winnerFound = this.search(token, curRow, curCol, -1, 1); } // forward diagonal search
    if (!winnerFound) { winnerFound = this.search(token, curRow, curCol, -1, -1); } // backward diagonal search
    return winnerFound;
  }

  private checkWinner() {
    for (let row = this.ticTacGameBoard.length - 1; row >= 0; row--) {
      for (let col = 0; col < this.ticTacGameBoard[row].rowList.length; col++) {
        const colValue = this.ticTacGameBoard[row].rowList[col].colValue;
        if (colValue === '-')
          continue;

        let winnerFound = this.beginSearch(colValue, row, col);

        if (winnerFound) { // if a winner was found, return winner by token
          this.winnerStatus = `The winner is: ${colValue}!`;
          return true;
        }
      }
    }
    return false;
  }
}
