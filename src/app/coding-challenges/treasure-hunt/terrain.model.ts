export class Terrain {
    constructor(private terrainChar_: string, private terrainName_: string, private terrainImage_: string) { }

    public get terrainChar() {
        return this.terrainChar_;
    }

    public get terrainName() {
        return this.terrainName_;
    }

    public get terrainImage() {
        return this.terrainImage_;
    }
}