import { Word } from './word.model';
// solving methods below
export const solveHelper = (words: Word[], crossword: string[][], numOfRowsAndCols: number) => {
    for (let word of words) { // search for every possible word in words array
        for (let row = 0; row < crossword.length; row++) {
            for (let col = 0; col < crossword[row].length; col++)
                beginSearch(row, col, word.value, numOfRowsAndCols, crossword);
        }
    }
}

const beginSearch = (curRow: number, curCol: number, word: string, numOfRowsAndCols: number, crossword: string[][]) => {
    // perform searches
    search(curRow, curCol, 0, 1, word, numOfRowsAndCols, crossword); // horizontal search
    search(curRow, curCol, 0, -1, word, numOfRowsAndCols, crossword); // horizontal reverse
    search(curRow, curCol, 1, 0, word, numOfRowsAndCols, crossword); // vertical search
    search(curRow, curCol, -1, 0, word, numOfRowsAndCols, crossword); // vertical reverse
    search(curRow, curCol, 1, 1, word, numOfRowsAndCols, crossword); // diagonal back search
    search(curRow, curCol, -1, -1, word, numOfRowsAndCols, crossword); // diagonal back reverse
    search(curRow, curCol, -1, 1, word, numOfRowsAndCols, crossword); // diagonal forward search
    search(curRow, curCol, 1, -1, word, numOfRowsAndCols, crossword); // diagonal forward reverse
}

const search = (curRow: number, curCol: number, rowDir: number, colDir: number, word: string, numOfRowsAndCols: number, crossword: string[][]) => {
    let coordinates: string[] = [];
    for (let i = 0; i < word.length; i++) {
        // search needs to be within bounds of crossword 2D array
        if (curRow > numOfRowsAndCols - 1 || curCol > numOfRowsAndCols - 1 || curRow < 0 || curCol < 0 || curCol > crossword[curRow].length)
            return;

        if (crossword[curRow][curCol] === word[i]) {
            coordinates.push(`${curRow},${curCol}`);
            curRow += rowDir;
            curCol += colDir;
        }
        else
            return;
    }
    highLightWord(coordinates);
}

// when a word is found, highlight it in the crossword so user can see where it is
const highLightWord = (coordinates: string[]) => {
    for (const coordinate of coordinates) {
        document.getElementById(`${coordinate}`)?.setAttribute("style", "background-color:yellow");
    }
}