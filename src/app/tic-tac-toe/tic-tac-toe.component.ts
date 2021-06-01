import { WinnerFound } from './winner-found';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})

export class TicTacToeComponent {
  private XTurn = true;
  public winnerStatus = ' ';
  public gameOver = false;
  public ticTacGameBoard = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];

  public getToken(token: string, i: number, j: number) {
    if (!this.gameOver) {
      if (this.XTurn)
        this.ticTacGameBoard[i][j] = 'X';
      else
        this.ticTacGameBoard[i][j] = 'O';
      this.XTurn = !this.XTurn;

      this.gameOver = this.checkWinner();
    }
  }

  public restart() {
    this.ticTacGameBoard = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];
    this.gameOver = false;
    this.winnerStatus = ' ';
    this.XTurn = true;
  }

  private search(token: string, curRow: number, curCol: number, rowDir: number, colDir: number, winnerFound: WinnerFound) {
    const winningTokenCount: number = 2; // need 2 more of the same tokens to win
    for (let i = 0; i < winningTokenCount; i++) {
      // depending on whether rowDir and colDir were a 1, -1 or a 0.
      // The game board will be traversed vertically, horizontally, forward diagonally or backward diagonally
      curRow += rowDir;
      curCol += colDir;

      // follow constraints of game board so that search doesn't go out of bounds
      if (curRow < 0 || curCol < 0 || curCol > this.ticTacGameBoard[curRow].length)
        return;

      if (this.ticTacGameBoard[curRow][curCol] === token)
        continue;
      else
        return;
    }
    winnerFound.winner = true;
  }

  private beginSearch(token: string, curRow: number, curCol: number, winnerFound: WinnerFound) {
    // perform these searches on each token
    // if a winner was found after the first search, there is no point in doing the next one
    this.search(token, curRow, curCol, -1, 0, winnerFound); // vertical search
    if (!winnerFound.winner) { this.search(token, curRow, curCol, 0, 1, winnerFound); } // horizontal search
    if (!winnerFound.winner) { this.search(token, curRow, curCol, -1, 1, winnerFound); } // forward diagonal search
    if (!winnerFound.winner) { this.search(token, curRow, curCol, -1, -1, winnerFound); } // backward diagonal search
  }

  private checkWinner() {
    let winnerFound = {
      winner: false
    }

    for (let row = this.ticTacGameBoard.length - 1; row > 0; row--) {
      for (let col = 0; col < this.ticTacGameBoard[row].length; col++) {
        if (this.ticTacGameBoard[row][col] === '-')
          continue;

        this.beginSearch(this.ticTacGameBoard[row][col], row, col, winnerFound);

        if (winnerFound.winner) { // if a winner was found, return winner by token
          this.winnerStatus = `The winner is: ${this.ticTacGameBoard[row][col]}!`;
          return true;
        }
      }
    }
    return false;
  }
}
