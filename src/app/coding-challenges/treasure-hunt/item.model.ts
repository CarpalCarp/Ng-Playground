export class Item {
    constructor(private itemRow_: number, private itemCol_: number, private itemName: string) { }

    public get row() { return this.itemRow_; }
    public get col() { return this.itemCol_; }
    public get name() { return this.itemName; }
    public set row(row) { this.itemRow_ = row; } // sets the row, used when item is dropped and gets repositioned
    public set col(col) { this.itemCol_ = col; } // sets the col, used when item is dropped and gets repositioned
}