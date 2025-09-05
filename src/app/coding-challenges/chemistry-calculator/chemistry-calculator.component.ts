import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'chemistry-calculator',
  templateUrl: './chemistry-calculator.component.html',
  styleUrls: ['./chemistry-calculator.component.css'],
  imports: [
    MatListModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true
})
export class ChemistryCalculatorComponent {
  title = 'Chemistry Calculator';
  compound = signal<string>('');
  Elements: any = {};
  ElementsArr: any[] = [];
  compoundExamples: string[] = ['H2O', 'H2O2', 'NaHCO3', 'C6H12O6'];

  private isNumber = (value: string) => !isNaN(parseInt(value));
  private isElement = (value: string) => /[A-Za-z]/.test(value);
  private isClosingChar = (value: string) => /[\])}]/.test(value);
  private isOpeningChar = (value: string) => /[\[({]/.test(value);
  private getProduct = (multiplierStack: number[]) => multiplierStack.reduce((acc: number, curVal: number) => acc * curVal);

  addToElementCount = (multiplierStack: number[], element: string, multiplier: number, Elements: any, previousEl: string) => {
    if (Elements[element] === undefined) // if element is undefined, if so then create it
      Elements[element] = 0;

    if (multiplierStack.length > 0 && this.isNumber(previousEl)) // if there is a multiplier inside of a group
      Elements[element] += multiplier * this.getProduct(multiplierStack);
    else if (multiplierStack.length > 0) // if there is a group
      Elements[element] += this.getProduct(multiplierStack);
    else // if there is a multiplier but no group
      Elements[element] += multiplier;
  }

  parseMolecule(formula: string) {
    this.Elements = {};
    let multiplier: number = 1;
    let multiplierStack: number[] = []; // keeps track of multiplier groups

    // tokenize input
    formula = formula.replace(/[0-9]+|[A-Z()\[\]{}](?![a-z])/g, ' $& ').trim();
    // split on spaces
    let formulaList: string[] = formula.split(/\s+/g);

    // tokenize input in reverse order
    for (const [i, token] of formulaList.reverse().entries()) {
      // token is a number
      if (this.isNumber(token))
        multiplier = parseInt(token);
      // token is an element
      else if (this.isElement(token))
        this.addToElementCount(multiplierStack, token, multiplier, this.Elements, formulaList[i - 1]);
      // token is ), ], or }
      else if (this.isClosingChar(token) && this.isNumber(formulaList[i - 1]))
        multiplierStack.push(parseInt(formulaList[i - 1]));
      // unnecesary ()'s, []'s, or {}'s. Ex: ((HO))
      else if (this.isClosingChar(token) && !this.isNumber(formulaList[i - 1]))
        multiplierStack.push(1); // add a placeholder 1
      // token is (, [ or {
      else if (this.isOpeningChar(token))
        multiplierStack.pop(); // remove current multiplier

      if (this.isElement(token)) // reset multiplier after reading an element token
        multiplier = 1;
    };

    this.ElementsArr = Object.entries(this.Elements).reverse();
  }
}
