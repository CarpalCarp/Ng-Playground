import { GameChar } from './game-char.model';
import { Component, ElementRef, OnInit } from '@angular/core';
import { GameMap } from './map.model';
import { GameConsole } from './game-console.model';

@Component({
  selector: 'app-treasure-hunt',
  templateUrl: './treasure-hunt.component.html',
  styleUrls: ['./treasure-hunt.component.css']
})
export class TreasureHuntComponent implements OnInit {
  public gameConsole: GameConsole;
  private mapItemName: string = '';
  private gameMap: GameMap;
  public player: GameChar;
  public miniMap: string[][];

  constructor() {
    this.miniMap = [
      ['-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-'],
    ];
    this.gameConsole = {
      textArea: `Enter\nhelp\nfor list of commands\n`
    };
    this.gameMap = new GameMap(0, 0);
    this.player = new GameChar();
  }

  ngOnInit() {
    this.readMapFile('./assets/treasure-hunt/map-files/map1.txt');
    this.readItemFile('./assets/treasure-hunt/map-files/map1items.txt');
  }

  // Note: I am reading all contents of the file into memory which I call mapMetaData first, I know it's bad practice to read files this way
  // but the program will always be small and so it's fine
  private async readMapFile(mapFileName: string) {
    let mapMetaData = [''];
    mapMetaData = await this.read(mapMetaData, mapFileName);
    this.parseMapFile(mapMetaData);
    this.setMiniMap();
  }

  private async readItemFile(itemFileName: string) {
    let itemMetaData = [''];
    itemMetaData = await this.read(itemMetaData, itemFileName);
    this.parseItemFile(itemMetaData);
  }

  private async read(metaData: string[], fileName: string) {
    metaData = await fetch(fileName)
      .then(response => response.text())
      .then(text => { return this.getMetaData(text) });
    return metaData;
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
  }

  private parseItemFile(itemMetaData: string[]) {
    for (let row of itemMetaData) {
      let items = row.split(';');
      this.player.createItemObjects(parseInt(items[0]), parseInt(items[1]), items[2]);
    }
  }

  private getMetaData(text: string) {
    return text.split('\n');
  }

  public restart() {
    this.gameConsole.textArea = '';
    this.player.restartPlayerLocation();
    this.setMiniMap()// update mini map
  }

  public setMiniMap() {
    let startingRow = this.player.row - 2;
    let startingCol = this.player.col - 2;
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

  public getMiniMapImg(mapChar: string) {
    if (!this.gameMap.CharToImg.has(mapChar))
      return '-';
    else
      return this.gameMap.CharToImg.get(mapChar);
  }

  public getPlayerImg() {
    if (this.gameMap.person.terrainImage === '')
      return "./assets/treasure-hunt/MapPics/NoImage.png";
    else
      return "./assets/treasure-hunt/" + this.gameMap.person.terrainImage;
  }

  public getDefaultImage() {
    return "./assets/treasure-hunt/MapPics/NoImage.png";
  }

  public parseCommands(inputField: HTMLInputElement) {
    let inputList: string[] = inputField.value.toLowerCase().split(' ');
    let valueOne = inputList[0];
    let valueTwo = inputList.slice(1).join(' '); // valueTwo is everything that comes after valueOne
    if (this.player.itemInLocation !== '' && valueTwo === '')
      valueTwo = this.player.itemInLocation;
    switch (valueOne.charAt(0)) {
      case 'g': // abreviated command for "go"
        this.go(valueTwo);
        break;
      case 't': // abbreviated command for "take"
        this.player.takeItem(valueTwo, this.gameConsole);
        break;
      case 'd': // abbreviated command for "drop"
        this.player.dropItem(valueTwo, this.gameConsole);
        break;
      case 'i': // abbreviated command for "inventory"
        this.player.displayInventory(this.gameConsole);
        break;
      case 'h': // abbreviated command for "help"
        this.help();
        break;
      default:
        this.gameConsole.textArea += `'${valueOne}' command is not supported in game.\n`;
        break;
    }
  }

  public go(direction: string) {
    this.gameConsole.textArea += this.player.move(direction, this.gameMap); // move
    this.gameConsole.textArea += this.player.displayLocation(this.gameMap); // display location
    this.setMiniMap()// update mini map
    this.player.searchForItems(this.gameConsole);// search for items
  }

  public help() {
    this.gameConsole.textArea += `// Game controls //\ngo <direction> //\nmoves character around\ntake <item name> // take an item, including the item name is optional\ndrop <item> // drop an item from inventory\ninventory // show items in inventory`;
  }
}
