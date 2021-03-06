import { Component, Input } from '@angular/core';

@Component({
  selector: 'directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent {
  @Input() title: string = "";
  public directions: string[] = [];

  public addNorth() {
    this.directions.push("NORTH");
  }

  public addSouth() {
    this.directions.push("SOUTH");
  }

  public addEast() {
    this.directions.push("EAST");
  }

  public addWest() {
    this.directions.push("WEST");
  }

  public clear() {
    this.directions = [];
  }

  removeOpp(value: string, opp: string) {
    value = value.replace(opp, '');
    return value.replace("  ", ' ');
  }

  dirReduce() {
    let tempString = this.directions.join(' ');
    while (tempString.includes("NORTH SOUTH") || tempString.includes("SOUTH NORTH") || tempString.includes("EAST WEST") || tempString.includes("WEST EAST")) {
      tempString = this.removeOpp(tempString, "NORTH SOUTH");
      tempString = this.removeOpp(tempString, "SOUTH NORTH");
      tempString = this.removeOpp(tempString, "EAST WEST");
      tempString = this.removeOpp(tempString, "WEST EAST");
    }
    if (tempString.trim() === '')
      this.directions = [];

    this.directions = tempString.trim().split(' ');
  }
}
