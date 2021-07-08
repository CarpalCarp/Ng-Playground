import { Word } from './word.model';
import { InsertionMethods } from './insertionMethods.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})

export class CrosswordComponent {
  @Input() title: string = '';
  private NUMOFCOLUMNS: number = 10;
  private NUMOFROWS: number = 10;
  private NUMOFINSERTIONMETHODS: number = 8;
  private ASCIICAPITALCHARAMOUNT: number = 26; // 26 total ascii characters to choose from
  private ASCIICAPITALMAX: number = 65; // 65 is where the capital characters start in ascii
  private takenSpaces: string[] = [];


  public crossword: string[][] = [
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
  private words: Word[] = [
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
  public resetHighlight() {
    for (let row = 0; row < this.crossword.length; row++) {
      for (let col = 0; col < this.crossword[row].length; col++) {
        document.getElementById(`${row},${col}`)?.setAttribute("style", "background-color:white");
      }
    }
  }

  private resetTakenSpaces() {
    this.takenSpaces = [];
  }

  public initializeCrossword() {
    this.resetTakenSpaces();
    this.resetHighlight();
    this.generateRandomCrossword();
    this.insertWords();
  }

  public generateRandomCrossword() {
    for (let row = 0; row < this.crossword.length; row++) {
      for (let col = 0; col < this.crossword[row].length; col++) {
        this.crossword[row][col] = String.fromCharCode(Math.floor(Math.random() * this.ASCIICAPITALCHARAMOUNT) + this.ASCIICAPITALMAX);
      }
    }
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
    let crosswordMetaData = {
      row: iterOne,
      col: iterTwo,
      crosswd: word
    }
    //console.log("Inserting " + word);
    const HALFWAYPOINT: number = 5;
    let rand = Math.floor(Math.random() * this.NUMOFINSERTIONMETHODS); // get random number between 0 and 7
    if (rand === InsertionMethods.IsDiagonalForwardReverse || rand === InsertionMethods.IsDiagonalForward)
      iterOne = HALFWAYPOINT;
    let rowCol: number[] = [];
    for (let i = 0; i < word.length; i++) {
      if (iterTwo > this.NUMOFCOLUMNS - 1) {
        iterTwo = 0;
        rand = Math.floor(Math.random() * this.NUMOFINSERTIONMETHODS); // get random number between 0 and 7
        //console.log(`Spot taken for ${word.split('')[i]} of word ${word}`);
        //console.log(`Retrying...`);
        this.removeFromTakenSpaces(i);
        i = 0;
      }
      if (iterOne > this.NUMOFCOLUMNS - 1 || iterOne < 0) {
        iterOne = 0;
        rand = Math.floor(Math.random() * this.NUMOFINSERTIONMETHODS); // get random number between 0 and 7
        if (rand === InsertionMethods.IsDiagonalForwardReverse || rand === InsertionMethods.IsDiagonalForward)
          iterOne = HALFWAYPOINT;
        //console.log(`Spot taken for ${word.split('')[i]} of word ${word}`);
        //console.log(`Retrying...`);
        this.removeFromTakenSpaces(i);
        i = 0;
      }
      switch (rand) {
        case InsertionMethods.IsVerticalReverse: // vertical reverse insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i, true);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
        case InsertionMethods.IsVertical: // vertical insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
        case InsertionMethods.IsHorizontalReverse: // horizontal reverse insert
          rowCol = this.insertHelper(iterOne, iterTwo, word, i, true);
          iterOne = rowCol[0];
          iterTwo = rowCol[1];
          break;
        case InsertionMethods.IsHorizontal: // horizontal insert
          rowCol = this.insertHelper(iterOne, iterTwo, word, i);
          iterOne = rowCol[0];
          iterTwo = rowCol[1];
          break;
        case InsertionMethods.IsDiagonalBackReverse: // diagonal back reverse insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i, true);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
        case InsertionMethods.IsDiagonalBack: // diagonal back insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
        case InsertionMethods.IsDiagonalForwardReverse: // diagonal forward reverse insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i, true);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
        case InsertionMethods.IsDiagonalForward: // diagonal forward insert
          rowCol = this.insertHelper(iterTwo, iterOne, word, i);
          iterTwo = rowCol[0];
          iterOne = rowCol[1];
          break;
      }

      if (rand === InsertionMethods.IsDiagonalForwardReverse || rand === InsertionMethods.IsDiagonalForward)
        iterOne--;
      else if (rand === InsertionMethods.IsDiagonalBackReverse || rand === InsertionMethods.IsDiagonalBack)
        iterOne++;

      i = rowCol[2];
      iterTwo++;
    }
  }

  private insertHelper(row: number, col: number, word: string, i: number, reverse?: boolean) {
    if (!this.takenSpaces.includes(`${row},${col}`)) {
      this.checkIfReverse(row, col, word, i, reverse);
      //console.log(`Added ${word.split('')[i]} to ${row},${col}`);
    } else {
      //console.log(`Spot taken for ${word.split('')[i]} of word ${word}`);
      //console.log(`Retrying...`);
      if (i > 0)
        this.removeFromTakenSpaces(i);
      i = -1;
      return [row++, col, i];
    }
    return [row, col, i];
  }

  // if reverse is true then insert word in reverse
  private checkIfReverse(row: number, col: number, word: string, i: number, reverse?: boolean) {
    if (reverse)
      this.crossword[row][col] = word.split('').reverse()[i];
    else
      this.crossword[row][col] = word.split('')[i];
    this.takenSpaces.push(`${row},${col}`); // save location in crossword
  }

  private removeFromTakenSpaces(currentIndex: number) {
    for (let j = 0; j < currentIndex; j++) {
      this.takenSpaces.pop();
    }
  }

  // solving methods below
  public solve() {
    for (let word of this.words) { // search for every possible word in words array
      for (let row = 0; row < this.crossword.length; row++) {
        for (let col = 0; col < this.crossword[row].length; col++) {
          this.beginSearch(row, col, word.value);
        }
      }
    }
  }

  private beginSearch(curRow: number, curCol: number, word: string) {
    // perform searches
    this.search(curRow, curCol, 0, 1, word); // horizontal search
    this.search(curRow, curCol, 0, -1, word); // horizontal reverse
    this.search(curRow, curCol, 1, 0, word); // vertical search
    this.search(curRow, curCol, -1, 0, word); // vertical reverse
    this.search(curRow, curCol, 1, 1, word); // diagonal back search
    this.search(curRow, curCol, -1, -1, word); // diagonal back reverse
    this.search(curRow, curCol, -1, 1, word); // diagonal forward search
    this.search(curRow, curCol, 1, -1, word); // diagonal forward reverse
  }

  private search(curRow: number, curCol: number, rowDir: number, colDir: number, word: string) {
    let coordinates: string[] = [];
    for (let i = 0; i < word.length; i++) {
      // search needs to be within bounds of crossword 2D array
      if (curRow > this.NUMOFROWS - 1 || curCol > this.NUMOFCOLUMNS - 1 || curRow < 0 || curCol < 0 || curCol > this.crossword[curRow].length)
        return;

      if (this.crossword[curRow][curCol] === word[i]) {
        coordinates.push(`${curRow},${curCol}`);
        curRow += rowDir;
        curCol += colDir;
      }
      else
        return;
    }
    this.highLightWord(coordinates);
  }

  // when a word is found, highlight it in the crossword so user can see where it is
  private highLightWord(coordinates: string[]) {
    for (const coordinate of coordinates) {
      document.getElementById(`${coordinate}`)?.setAttribute("style", "background-color:yellow");
    }
  }
}
