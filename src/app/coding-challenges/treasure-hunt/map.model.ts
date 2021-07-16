import { Terrain } from './terrain.model';

export class Map {
    private MINI_MAP_SIZE: number = 5;
    public map: string[][]; // double array used to travel through "map" in game

    private imageHeight: number = 0; // holds image height
    private imageWidth: number = 0; // holds image width
    private itemFileName: string = ''; // holds the name of the text that that tells which items are present on the map
    private mapHeight: number = 0;
    private mapWidth: number = 0;

    public plain: Terrain;
    public mountain: Terrain;
    public forest: Terrain;
    public water: Terrain;
    public treasure: Terrain;
    public out: Terrain;
    public person: Terrain;

    constructor(private totalRows: number, private totalCols: number) {
        this.map = new Array(totalRows);
        for (let i = 0; i < totalCols - 2; i++) {
            this.map[i] = new Array(totalCols);
        }

        this.plain = new Terrain('', '', '');
        this.mountain = new Terrain('', '', '');
        this.forest = new Terrain('', '', '');
        this.water = new Terrain('', '', '');
        this.treasure = new Terrain('', '', '');
        this.out = new Terrain('', '', '');
        this.person = new Terrain('', '', '');
    }

    public display() {
        console.log(this.map);
        console.log('Map height: ' + this.mapHeight);
        console.log('Map width: ' + this.mapWidth);
        console.log(this.plain);
        console.log(this.mountain);
        console.log(this.forest);
        console.log(this.water);
        console.log(this.treasure);
        console.log(this.out);
        console.log(this.person);
    }

    // will initialize outer boundary with X's, this is the area the player can't travel to and it needs to be more than 1 layer thick
    public initializeMap() {
        for (let row = 0; row <= this.totalRows; row++) {
            for (let col = 0; col < this.totalCols; col++) {
                if (row == 0 || row == 1 || row == this.totalRows || row == this.totalRows - 1 || col == 1 || col == 0 || col == this.totalCols - 1 || col == this.totalCols - 2)
                    this.map[row][col] = 'X';
            }
        }
    }

    // fillMap() fills up the map according to the characters from the file
    public fillMap(buffer: string, row: number) {
        for (let col = 2; col < this.totalCols - 2; col++) {
            this.map[row][col] = buffer[col - 2]; // place each character from file on the map inside the X parameter
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

    public initializeMapItems(buffer: string[]) {
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
                // TODO throw error here
                break;
        }
    }
}