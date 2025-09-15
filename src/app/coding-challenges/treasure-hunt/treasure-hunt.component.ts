import { GameChar } from './game-char.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameMap } from './map.model';
import { GameConsole } from './game-console.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-treasure-hunt',
  templateUrl: './treasure-hunt.component.html',
  styleUrls: ['./treasure-hunt.component.css'],
  imports: [
    FormsModule,
    MatButtonModule
  ],
  standalone: true
})
export class TreasureHuntComponent implements OnInit {
  @ViewChild('textarea') textArea!: ElementRef;
  gameConsole: GameConsole;
  player: GameChar;
  playerImage: string = './assets/treasure-hunt/MapPics/NoImage.png';
  defaultImage: string = './assets/treasure-hunt/MapPics/NoImage.png';
  miniMap = [
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-']
  ];
  charToCommand: { [index: string]: (valueTwo: string, gameConsole: GameConsole) => void } = {
    g: (valueTwo: string, gameConsole: GameConsole) => this.go(valueTwo, gameConsole),
    t: (valueTwo: string, gameConsole: GameConsole) => this.player.takeItem(valueTwo, gameConsole),
    d: (valueTwo: string, gameConsole: GameConsole) => this.player.dropItem(valueTwo, gameConsole),
    i: (valueTwo: string, gameConsole: GameConsole) => this.player.displayInventory(valueTwo, gameConsole),
    h: (valueTwo: string, gameConsole: GameConsole) => this.help(valueTwo, gameConsole)
  };

  private mapItemName: string;
  private gameMap: GameMap;

  constructor() {
    this.gameConsole = {
      textArea: `Enter\nhelp\nfor list of commands\n`
    };
    this.gameMap = new GameMap(0, 0);
    this.player = new GameChar();
    this.mapItemName = '';
  }

  ngOnInit() {
    this.readMapFile('./assets/treasure-hunt/map-files/map1.txt');
    this.readItemFile('./assets/treasure-hunt/map-files/map1items.txt');
  }

  restart() {
    this.gameConsole.textArea = '';
    this.player.restartPlayerLocation();
    this.setMiniMap()// update mini map
  }

  setMiniMap() {
    const startingRow = this.player.row - 2;
    const startingCol = this.player.col - 2;
    let miniMapRow = 0;
    let miniMapCol = 0;
    for (let row = startingRow; row < startingRow + this.gameMap.miniMapSize; row++) {
      for (let col = startingCol; col < startingCol + this.gameMap.miniMapSize; col++) {
        this.miniMap[miniMapRow][miniMapCol] = this.getMiniMapImg(this.gameMap.map[row][col])!;
        miniMapCol++;
      }
      miniMapCol = 0;
      miniMapRow++;
    }
  }

  getMiniMapImg(mapChar: string) {
    if (!this.gameMap.CharToImg.has(mapChar))
      return '-';
    else
      return this.gameMap.CharToImg.get(mapChar);
  }

  setPlayerImg() {
    this.playerImage = './assets/treasure-hunt/' + this.gameMap.person.terrainImage;
  }

  parseCommands(inputField: HTMLInputElement) {
    const inputList: string[] = inputField.value.toLowerCase().split(' ');
    const valueOne = inputList[0];
    let valueTwo = inputList.slice(1).join(' '); // valueTwo is everything that comes after valueOne
    if (this.player.itemInLocation !== '' && valueTwo === '')
      valueTwo = this.player.itemInLocation;

    if (!valueOne || !(valueOne[0] in this.charToCommand)) {
      this.gameConsole.textArea += ''; // display error message
    } else {
      this.charToCommand[valueOne[0]](valueTwo, this.gameConsole)
    }
    this.scrollToBottom();
  }

  go(direction: string, gameConsole: GameConsole) {
    this.gameConsole.textArea += this.player.move(direction, this.gameMap); // move
    this.gameConsole.textArea += this.player.displayLocation(this.gameMap); // display location
    this.setMiniMap()// update mini map
    this.player.searchForItems(this.gameConsole);// search for items
  }

  help(valueTwo: string, gameConsole: GameConsole) {
    this.gameConsole.textArea += `// Game controls //\ngo <direction> //\nmoves character around\ntake <item name> // take an item, including the item name is optional\ndrop <item> // drop an item from inventory\ninventory // show items in inventory`;
  }

  private scrollToBottom() {
    // Request the browser to auto scroll before the next repaint. Removes textarea flicker.
    window.requestAnimationFrame(() => {
      this.textArea.nativeElement.scrollTop = this.textArea.nativeElement.scrollHeight;
    });
  }

  // Note: I am reading all contents of the file into memory which I call mapMetaData first, I know it's bad practice to read files this way
  // but the program will always be small and so it's fine
  private async readMapFile(mapFileName: string) {
    const mapMetaData = await this.read(mapFileName);
    this.parseMapFile(mapMetaData);
    this.setMiniMap();
  }

  private async readItemFile(itemFileName: string) {
    const itemMetaData = await this.read(itemFileName);
    this.parseItemFile(itemMetaData);
  }

  private async read(fileName: string) {
    const response = await fetch(fileName);
    const text = await response.text();
    return this.getFileData(text);
  }

  private parseMapFile(mapMetaData: string[]) {
    let lineNo = 0; // keeps track of line number in file
    this.mapItemName = mapMetaData[0]; // map name is at line 1
    lineNo++;
    let totalRows = parseInt(mapMetaData[1].split(' ')[0]); // row and column are on the same line separated by a space
    let totalColumns = parseInt(mapMetaData[1].split(' ')[1]);
    lineNo++;
    this.gameMap = new GameMap(totalRows + 4, totalColumns + 4);
    this.gameMap.initializeMap();

    while (lineNo < (2 + totalRows)) { // read over map character data
      if (mapMetaData[lineNo].length !== totalColumns) {
        this.gameConsole.textArea += `Error in map file. Line number: ${(lineNo + 1)} does not have ${totalColumns} columns.`;
        return;
      }

      this.gameMap.fillMap(mapMetaData[lineNo], lineNo);
      lineNo++;
    }
    while (lineNo < mapMetaData.length) { // read over item data
      this.gameMap.initializeMapTerrain(mapMetaData[lineNo].split(';'));
      lineNo++;
    }
    this.gameMap.setCharToImageObj();
    this.setPlayerImg();
  }

  private parseItemFile(itemMetaData: string[]) {
    for (let row of itemMetaData) {
      let items = row.split(';');
      this.player.createItemObjects(parseInt(items[0]), parseInt(items[1]), items[2]);
    }
  }

  private getFileData(text: string) {
    let splitOn = '\n';
    if (text.includes('\r\n')) {
      splitOn = '\r\n';
    }
    return text.split(splitOn);
  }
}
