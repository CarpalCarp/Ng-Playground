import { Terrain } from './terrain.model';

export class GameMap {
    private MINI_MAP_SIZE: number = 5;
    private MAP_EDGE = 3;
    public map: string[][]; // double array used to travel through "map" in game

    private itemFileName: string = ''; // holds the name of the text that that tells which items are present on the map
    private mapHeight: number = 0;
    private mapWidth: number = 0;
    public CharToImg: Map<string, string>;

    public plain: Terrain;
    public mountain: Terrain;
    public forest: Terrain;
    public water: Terrain;
    public treasure: Terrain;
    public out: Terrain;
    public person: Terrain;

    constructor(private totalRows: number, private totalCols: number) {
        this.map = new Array(totalRows);
        for (let i = 0; i < totalRows; i++) {
            this.map[i] = new Array(totalCols);
        }

        this.CharToImg = new Map([]);

        this.plain = new Terrain('', '', '');
        this.mountain = new Terrain('', '', '');
        this.forest = new Terrain('', '', '');
        this.water = new Terrain('', '', '');
        this.treasure = new Terrain('', '', '');
        this.out = new Terrain('', '', '');
        this.person = new Terrain('', '', '');
    }

    public getSouthEdge() {
        return this.totalRows - this.MAP_EDGE;
    }

    public getEastEdge() {
        return this.totalCols - this.MAP_EDGE;
    }

    // will initialize outer boundary with -'s, this is the area the player can't travel to and it needs to be more than 1 layer thick
    public initializeMap() {
        for (let row = 0; row < this.totalRows; row++) {
            for (let col = 0; col < this.totalCols; col++) {
                if (row === 0 || row === 1 || row === this.totalRows - 1 || row === this.totalRows - 2 || col === 0 || col === 1 || col === this.totalCols - 1 || col === this.totalCols - 2)
                    this.map[row][col] = '-';
            }
        }
    }

    // fillMap() fills up the map according to the characters from the file
    public fillMap(buffer: string, row: number) {
        let indexToBuffer = 0;
        for (let col = 0; col < this.totalCols - 0; col++) {
            // don't set characters in the first and last two columns which are out of bounds
            if (col > 1 && col < this.totalCols - 2) {
                this.map[row][col] = buffer[indexToBuffer]; // place each character from file on the map inside the '-' parameter
                indexToBuffer++;
            }
        }
    }

    public set height(_height: string) {
        this.mapHeight = parseInt(_height);
    }

    public set width(_width: string) {
        this.mapWidth = parseInt(_width);
    }

    public get miniMapSize() {
        return this.MINI_MAP_SIZE;
    }

    public initializeMapTerrain(buffer: string[]) {
        let terrainName = buffer[1].toLowerCase();
        switch (terrainName) {
            case "mountain":
                this.mountain = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "plains":
                this.plain = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "forest":
                this.forest = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "water":
                this.water = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "goal":
                this.treasure = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "out":
                this.out = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            case "person":
                this.person = new Terrain(buffer[0], terrainName, buffer[2]);
                break;
            default:
                break;
        }
    }

    public setCharToImageObj() {
        this.CharToImg.set(this.mountain.terrainChar, this.mountain.terrainImage);
        this.CharToImg.set(this.out.terrainChar, this.out.terrainImage);
        this.CharToImg.set(this.person.terrainChar, this.person.terrainImage);
        this.CharToImg.set(this.plain.terrainChar, this.plain.terrainImage);
        this.CharToImg.set(this.treasure.terrainChar, this.treasure.terrainImage);
        this.CharToImg.set(this.water.terrainChar, this.water.terrainImage);
        this.CharToImg.set(this.forest.terrainChar, this.forest.terrainImage);
    }
}