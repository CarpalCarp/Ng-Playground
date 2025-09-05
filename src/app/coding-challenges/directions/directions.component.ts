import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css'],
  imports: [
    MatListModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  standalone: true
})
export class DirectionsComponent {
  title = input<string>('');
  directions: string[] = [];

  addNorth() {
    this.directions.push('NORTH');
  }

  addSouth() {
    this.directions.push('SOUTH');
  }

  addEast() {
    this.directions.push('EAST');
  }

  addWest() {
    this.directions.push('WEST');
  }

  clear() {
    this.directions = [];
  }

  removeOpp(value: string, opp: string) {
    value = value.replace(opp, '');
    return value.replace('  ', ' ');
  }

  dirReduce() {
    let tempString = this.directions.join(' ');
    while (tempString.includes('NORTH SOUTH') || tempString.includes('SOUTH NORTH') || tempString.includes('EAST WEST') || tempString.includes('WEST EAST')) {
      tempString = this.removeOpp(tempString, 'NORTH SOUTH');
      tempString = this.removeOpp(tempString, 'SOUTH NORTH');
      tempString = this.removeOpp(tempString, 'EAST WEST');
      tempString = this.removeOpp(tempString, 'WEST EAST');
    }
    if (tempString.trim() === '')
      this.directions = [];

    this.directions = tempString.trim().split(' ');
  }
}
