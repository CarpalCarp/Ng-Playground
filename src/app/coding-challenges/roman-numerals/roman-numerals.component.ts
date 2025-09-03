import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'roman-numerals',
  templateUrl: './roman-numerals.component.html',
  styleUrls: ['./roman-numerals.component.css'],
  imports: [
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule
  ],
  standalone: true
})
export class RomanNumeralsComponent {
  @Input() title: string = '';
  public numeral: string = '';
  public romanToInt = [
    { numeral: "I", int: 1 },
    { numeral: "V", int: 5 },
    { numeral: "X", int: 10 },
    { numeral: "L", int: 50 },
    { numeral: "C", int: 100 },
    { numeral: "D", int: 500 },
    { numeral: "M", int: 1000 }
  ];
  public symTable: Map<string, string> = new Map([
    ["I", "1"],
    ["V", "5"],
    ["X", "10"],
    ["L", "50"],
    ["C", "100"],
    ["D", "500"],
    ["M", "1000"],
  ]);

  public calculateNumeral(_numeral: string) {
    this.numeral = _numeral
      .split('') // split into array of characters
      .map(romNum => romNum = this.symTable.get(romNum)!) // get the number from the corresponding Roman Numeral
      .map(romNum => parseInt(romNum)) // change array of strings into array of numbers
      .reduceRight((prev, cur, i, arr) => (arr[i + 1] > cur) ? prev - cur : prev + cur) // add up the numbers
      .toString();
  }
}
