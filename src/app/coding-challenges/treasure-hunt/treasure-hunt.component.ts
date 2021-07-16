import { GameChar } from './game-char.model';
import { Component } from '@angular/core';
import { Map } from './map.model';

@Component({
  selector: 'app-treasure-hunt',
  templateUrl: './treasure-hunt.component.html',
  styleUrls: ['./treasure-hunt.component.css']
})
export class TreasureHuntComponent {
  private OUTER_BOUNDARY = 3;

  private command: string = '';
  private direction: string = '';
  private listOfInputs: string[] = [];
  private mapFileName: string = './assets/treasure-hunt/map-files/map1.txt';
  private mapItemName: string = '';
  private mapText: string = '';
  private mapMetaData: string[] = [];
  private gameMap: Map;
  public player: GameChar;
  public miniMap: string[][] = [
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-'],
  ];

  constructor() {
    this.readFile();
    this.gameMap = new Map(0, 0);
    this.player = new GameChar();
  }

  private async readFile() {
    await fetch(this.mapFileName)
      .then(response => response.text())
      .then(text => this.setMetaData(text));

    this.mapItemName = this.mapMetaData[0]; // map name is at line 1
    let row = parseInt(this.mapMetaData[1].split(' ')[0]); // row and column are on the same line separated by a space
    let column = parseInt(this.mapMetaData[1].split(' ')[1]);
    this.gameMap = new Map(row + this.OUTER_BOUNDARY, column + this.OUTER_BOUNDARY + 1);
    this.gameMap.initializeMap();
    this.gameMap.height = this.mapMetaData[2].split(' ')[0]; // map height and width are on the same line separated by space
    this.gameMap.width = this.mapMetaData[2].split(' ')[1];
    let iterator = this.OUTER_BOUNDARY;

    while (iterator < (this.OUTER_BOUNDARY + row)) { // read over map character data 
      this.gameMap.fillMap(this.mapMetaData[iterator], iterator - 1);
      iterator++;
    }
    while (iterator < this.mapMetaData.length) { // read over item data
      this.gameMap.initializeMapItems(this.mapMetaData[iterator].split(';'));
      iterator++;
    }

    this.createMiniMap();
  }

  private setMetaData(text: string) {
    this.mapMetaData = text.split('\n');
  }

  public createMiniMap() {
    let startingRow = this.player.row - 2;
    let startingCol = this.player.col - 2;
    // clear map TODO
    let gridRow = 0;
    let gridCol = 0;
    for (let row = startingRow; row < startingRow + this.gameMap.miniMapSize; row++) {
      for (let col = startingCol; col < startingCol + this.gameMap.miniMapSize; col++) {
        this.miniMap[gridRow][gridCol] = this.getMiniMapImg(this.gameMap.map[row][col]);
        gridCol++;
      }
      gridCol = 0;
      gridRow++;
    }
    console.log(this.miniMap);
    console.log(this.gameMap.map);
  }

  public getMiniMapImg(mapChar: string) {
    switch (mapChar) {
      case this.gameMap.mountain.terrainChar:
        return this.gameMap.mountain.terrainImage;
      case this.gameMap.out.terrainChar:
        return this.gameMap.out.terrainImage;
      case this.gameMap.person.terrainChar:
        return this.gameMap.person.terrainImage;
      case this.gameMap.plain.terrainChar:
        return this.gameMap.plain.terrainImage;
      case this.gameMap.treasure.terrainChar:
        return this.gameMap.treasure.terrainImage;
      case this.gameMap.water.terrainChar:
        return this.gameMap.water.terrainImage;
      case this.gameMap.forest.terrainChar:
        return this.gameMap.forest.terrainImage;
      default:
        return 'X';
    }
  }

  public getPlayerImg() {
    return this.gameMap.person.terrainImage;
  }
}
