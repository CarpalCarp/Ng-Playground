import { GameConsole } from './game-console.model';
import { Item } from './item.model';
import { GameMap } from './map.model';
export class GameChar {
    private row_: number;
    private col_: number;
    private mapBoundary_: number;
    private itemsInLocation: boolean;
    private mapItems: Item[];
    private inventory: Item[];
    private itemInLocation_: string;

    constructor() {
        this.row_ = 2;
        this.col_ = 2;
        this.mapBoundary_ = 2;
        this.mapItems = [];
        this.inventory = [];
        this.itemsInLocation = false;
        this.itemInLocation_ = '';
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

    public get itemInLocation() {
        return this.itemInLocation_;
    }

    public restartPlayerLocation() {
        this.row_ = 2;
        this.col_ = 2;
    }

    public move(command: string, gameMap: GameMap) {
        const northEdge = this.mapBoundary_;
        const eastEdge = gameMap.getEastEdge();
        const southEdge = gameMap.getSouthEdge();
        const westEdge = this.mapBoundary_;

        switch (command.charAt(0)) {
            case 'n': // check north
                if (this.row_ === northEdge)
                    return "You cannot go that far north.\n";
                else {
                    this.row_--;
                    return "Going north.\n";
                }
            case 'e': // check east
                if (this.col_ === eastEdge)
                    return "You cannot go that far east.\n";
                else {
                    this.col_++;
                    return "Going east.\n";
                }
            case 's': // check south
                if (this.row_ === southEdge)
                    return "You cannot go that far south.\n";
                else {
                    this.row_++;
                    return "Going south.\n";
                }
            case 'w': // check west
                if (this.col_ === westEdge)
                    return "You cannot go that far west.\n";
                else {
                    this.col_--;
                    return "Going West.\n";
                }
            default: // in case an invalid direction was given
                return `Invalid direction: ${command}, try again\n`;
        }
    }

    public displayLocation(gameMap: GameMap) {
        return `Location: (${this.row_ - this.mapBoundary_},${this.col_ - this.mapBoundary_}) in terrain: ${gameMap.map[this.row_][this.col_]}.\n`;
    }

    public createItemObjects(row: number, col: number, name: string) {
        this.mapItems.push(new Item(row, col, name));
    }

    public searchForItems(console: GameConsole) {
        for (let item of this.mapItems) { // on current location check items in arrayList to see if any are located
            if ((this.row - this.mapBoundary) == item.row && (this.col - this.mapBoundary) == item.col) // if row and col match, item is found
            {
                // let user know item was found
                console.textArea += `An item was found!: ${item.name}\n`;
                this.itemInLocation_ = item.name;
                this.itemsInLocation = true;
                return;
            }
        }
        this.itemInLocation_ = '';
        this.itemsInLocation = false;
    }

    public takeItem(itemName: string, gameConsole: GameConsole) {
        if (!this.itemsInLocation) {// if user wants to take and there are no items, let user know
            gameConsole.textArea += "There are no items here.\n";
        } else {
            let index = this.getItemIndex(this.mapItems, itemName);
            if (index != -1) {
                let item: Item = this.mapItems.splice(index, 1)[0]; // remove item from mapItems. The [0] syntax is because splice returns an array and it will only have 1 element at the 0th index
                this.inventory.push(item); // add item to inventory
                gameConsole.textArea += `${itemName} was taken and added to inventory.\n`;
                this.searchForItems(gameConsole);// search for items again in case there is another one
            } else
                gameConsole.textArea += `${itemName} is not here.\n`; // if no item is found, let user know
        }
    }

    public dropItem(itemName: string, gameConsole: GameConsole) {
        if (this.inventory.length === 0) { // if inventory is empty, there are no items to drop
            gameConsole.textArea += `There are no items in your inventory.\n`;
        } else if (itemName === '') {
            gameConsole.textArea += `Please specify what item to drop.\n`;
        } else {
            let index = this.getItemIndex(this.inventory, itemName);
            if (index != -1) { // not in inventory
                let item = this.inventory.splice(index, 1)[0]; // retrieve item from inventory
                item.row = this.row - this.mapBoundary; //update new row for item
                item.col = this.col - this.mapBoundary; // update new col for item
                this.mapItems.push(item); // remove from inventory and add to mapItems
                gameConsole.textArea += `${itemName} is dropped.\n`;
                this.searchForItems(gameConsole);// search for items again in case there is another one
            } else
                gameConsole.textArea += `${itemName} is not in your inventory.\n`;
        }
    }

    private getItemIndex(bag: Item[], itemName: string) {
        for (let item of bag) {
            if (item.name === itemName) // if item is found, get the index
                return bag.indexOf(item);
        }
        return -1;
    }

    public displayInventory(gameConsole: GameConsole) {
        gameConsole.textArea += "Inventory:\n";
        if (this.inventory.length === 0)
            gameConsole.textArea += "Empty\n";
        else {
            for (let item of this.inventory)
                gameConsole.textArea += `${item.name}\n`;
        }
    }
}