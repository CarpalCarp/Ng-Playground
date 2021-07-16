export class GameChar {
    private row_: number;
    private col_: number;
    private mapBoundary_: number;

    constructor() {
        this.row_ = 2;
        this.col_ = 2;
        this.mapBoundary_ = 2;
    }

    public get row() {
        return this.row_;
    }

    public get col() {
        return this.col_;
    }

    public get mapBoundary() {
        return this.mapBoundary_;
    }
}