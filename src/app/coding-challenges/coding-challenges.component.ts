import { Component, OnInit } from '@angular/core';
// import { TreasureHuntComponent } from './treasure-hunt/treasure-hunt.component';
import { MatCardModule } from '@angular/material/card';
import { CrosswordComponent } from './crossword/crossword.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { DirectionsComponent } from './directions/directions.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { RomanNumeralsComponent } from './roman-numerals/roman-numerals.component';
import { ChemistryCalculatorComponent } from './chemistry-calculator/chemistry-calculator.component';

@Component({
  selector: 'coding-challenges',
  templateUrl: './coding-challenges.component.html',
  styleUrls: ['./coding-challenges.component.css'],
  imports: [
    MatCardModule,
    // TreasureHuntComponent,
    // CrosswordComponent,
    // ToDoListComponent,
    // DirectionsComponent,
    TicTacToeComponent,
    RomanNumeralsComponent,
    ChemistryCalculatorComponent
  ],
  standalone: true
})
export class CodingChallengesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
