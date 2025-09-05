import { Word } from './word.model';
import { InsertionMethods } from './insertionMethods.model';
import { Component } from '@angular/core';
import { solveHelper } from './solvingMethods';

interface CWMetaData {
  row: number,
  col: number,
  crosswd: string
  reverse: boolean,
  iterator: number,
  rand: number
}

@Component({
  selector: 'crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css'],
  standalone: true
})
export class CrosswordComponent {
  title = 'Crossword';
  private NUMOFCOLUMNS: number = 10;
  private NUMOFROWS: number = 10;
  private HALFWAYPOINT: number = this.NUMOFCOLUMNS / 2;
  private NUMOFINSERTIONMETHODS: number = 8;
  private ASCIICAPITALCHARAMOUNT: number = 26; // 26 total ascii characters to choose from
  private ASCIICAPITALMAX: number = 65; // 65 is where the capital characters start in ascii
  private takenSpaces: string[] = [];


  crossword: string[][] = [
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS),
    new Array(this.NUMOFCOLUMNS)
  ];

  // words must not be greater than 5 characters
  words: Word[] = [
    new Word("CAT"),
    new Word("BIRD"),
    new Word("RIVER"),
    new Word("PANEL"),
    new Word("LIGHT")
  ];

  ngOnInit() {
    this.initializeCrossword();
  }

  // go through all span tags and reset color attribute to black just in case they were highlighted before
  resetHighlight() {
    for (let row = 0; row < this.crossword.length; row++) {
      for (let col = 0; col < this.crossword[row].length; col++) {
        document.getElementById(`${row},${col}`)?.setAttribute("style", "background-color:white");
      }
    }
  }

  initializeCrossword() {
    this.resetTakenSpaces();
    this.resetHighlight();
    this.generateRandomCrossword();
    this.insertWords();
  }

  generateRandomCrossword() {
    for (let row = 0; row < this.crossword.length; row++) {
      for (let col = 0; col < this.crossword[row].length; col++) {
        this.crossword[row][col] = String.fromCharCode(Math.floor(Math.random() * this.ASCIICAPITALCHARAMOUNT) + this.ASCIICAPITALMAX);
      }
    }
  }

  solve() {
    solveHelper(this.words, this.crossword, this.NUMOFROWS);
  }

  private resetTakenSpaces() {
    this.takenSpaces = [];
  }

  private insertWords() {
    let count = 0;
    for (let word of this.words) {
      this.insert(count, this.getRandomLocation(word), word.value);
      count++;
    }
  }

  private getRandomLocation(word: Word) { return Math.floor(Math.random() * this.getBoundsOfCrossword(word.valueLength)) }

  private getBoundsOfCrossword(length: number) { return (11 - length) }

  // insert() places a word randomly in the crossword
  private insert(iterOne: number, iterTwo: number, word: string) {
    // common Meta Data that is passed around helper functions
    let crosswdMetaData: CWMetaData = {
      row: iterOne,
      col: iterTwo,
      crosswd: word,
      reverse: false,
      iterator: 0,
      rand: Math.floor(Math.random() * this.NUMOFINSERTIONMETHODS) // get random number between 0 and 7
    }
    //console.log("Inserting " + word);
    crosswdMetaData = this.diagonalMove(crosswdMetaData);

    for (let i = 0; i < crosswdMetaData.crosswd.length; i++) {
      crosswdMetaData = this.checkOutOfBounds(crosswdMetaData, i);
      i = crosswdMetaData.iterator; // reason for updating i is sometimes the helper methods change i depending if the word needs to be added again due to collision or out of bounds
      crosswdMetaData = this.setReverseMethods(crosswdMetaData);
      crosswdMetaData = this.insertHelper(crosswdMetaData, i);
      i = crosswdMetaData.iterator; // update i
      crosswdMetaData = this.setInsertionMethod(crosswdMetaData);
      crosswdMetaData.reverse = false;
    }
  }

  private setInsertionMethod(crosswdMetaData: CWMetaData) {
    if (crosswdMetaData.rand === InsertionMethods.IsDiagonalForwardReverse || crosswdMetaData.rand === InsertionMethods.IsDiagonalForward)
      crosswdMetaData.row--;
    else if (crosswdMetaData.rand === InsertionMethods.IsDiagonalBackReverse || crosswdMetaData.rand === InsertionMethods.IsDiagonalBack)
      crosswdMetaData.row++;
    if (crosswdMetaData.rand === InsertionMethods.IsVertical || crosswdMetaData.rand === InsertionMethods.IsVerticalReverse)
      crosswdMetaData.row++;
    else // InsertionMethods.IsHorizontal and .IsHorizontalReverse are default
      crosswdMetaData.col++;
    return crosswdMetaData;
  }

  private setReverseMethods(crosswdMetaData: CWMetaData) {
    switch (crosswdMetaData.rand) {
      case InsertionMethods.IsVerticalReverse: // vertical reverse insert
      case InsertionMethods.IsHorizontalReverse: // horizontal reverse insert
      case InsertionMethods.IsDiagonalBackReverse: // diagonal back reverse insert
      case InsertionMethods.IsDiagonalForwardReverse: // diagonal forward reverse insert
        crosswdMetaData.reverse = true;
        break;
    }
    return crosswdMetaData;
  }

  private insertHelper(MetaData: CWMetaData, i: number) {
    if (!this.takenSpaces.includes(`${MetaData.row},${MetaData.col}`)) {
      this.checkIfReverse(MetaData, i);
    } else { // if spot in crossword is taken, then restart
      if (i > 0) {
        this.removeFromTakenSpaces(i);
      }
      MetaData.iterator = -1;
      MetaData.row++;
      return MetaData;
    }
    MetaData.iterator = i;
    return MetaData;
  }

  private checkOutOfBounds(crosswdMetaData: CWMetaData, i: number) {
    if (crosswdMetaData.col > this.NUMOFCOLUMNS - 1 || crosswdMetaData.row > this.NUMOFCOLUMNS - 1 || crosswdMetaData.row < 0) {
      crosswdMetaData.rand = Math.floor(Math.random() * this.NUMOFINSERTIONMETHODS); // get random number between 0 and 7
      if (crosswdMetaData.col > this.NUMOFCOLUMNS - 1)
        crosswdMetaData.col = 0;
      if (crosswdMetaData.row > this.NUMOFCOLUMNS - 1 || crosswdMetaData.row < 0)
        crosswdMetaData.row = 0;
      crosswdMetaData = this.diagonalMove(crosswdMetaData);
      this.removeFromTakenSpaces(i);
      crosswdMetaData.iterator = 0;
    } else
      crosswdMetaData.iterator = i;

    return crosswdMetaData;
  }

  // when performing Diagonal Forward or Diagonal Forward Reverse, move the row to the halfway point to avoid getting out of bounds
  private diagonalMove(MetaData: CWMetaData) {
    if (MetaData.rand === InsertionMethods.IsDiagonalForwardReverse || MetaData.rand === InsertionMethods.IsDiagonalForward)
      MetaData.row = this.HALFWAYPOINT;
    return MetaData;
  }

  // if reverse is true then insert word in reverse
  private checkIfReverse(MetaData: CWMetaData, i: number) {
    if (MetaData.reverse)
      this.crossword[MetaData.row][MetaData.col] = MetaData.crosswd.split('').reverse()[i];
    else
      this.crossword[MetaData.row][MetaData.col] = MetaData.crosswd.split('')[i];
    this.takenSpaces.push(`${MetaData.row},${MetaData.col}`); // save location in crossword
  }

  private removeFromTakenSpaces(currentIndex: number) {
    for (let j = 0; j < currentIndex; j++)
      this.takenSpaces.pop();
  }
}
