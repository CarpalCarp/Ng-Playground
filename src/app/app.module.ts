import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CodingChallengesComponent } from './coding-challenges/coding-challenges.component';
import { ChemistryCalculatorComponent } from './coding-challenges/chemistry-calculator/chemistry-calculator.component';
import { TicTacToeComponent } from './coding-challenges/tic-tac-toe/tic-tac-toe.component';
import { RomanNumeralsComponent } from './coding-challenges/roman-numerals/roman-numerals.component';
import { DirectionsComponent } from './coding-challenges/directions/directions.component';
import { ToDoListComponent } from './coding-challenges/to-do-list/to-do-list.component';
import { ToDoComponent } from './coding-challenges/to-do-list/to-do/to-do.component';
import { CrosswordComponent } from './coding-challenges/crossword/crossword.component';
import { TreasureHuntComponent } from './coding-challenges/treasure-hunt/treasure-hunt.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    ChemistryCalculatorComponent,
    AboutMeComponent,
    ProjectsComponent,
    NotFoundComponent,
    CertificatesComponent,
    TicTacToeComponent,
    CodingChallengesComponent,
    RomanNumeralsComponent,
    DirectionsComponent,
    ToDoListComponent,
    ToDoComponent,
    CrosswordComponent,
    TreasureHuntComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    AppRoutingModule,
    MatGridListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
