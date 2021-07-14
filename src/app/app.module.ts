import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { CarouselComponent } from './about-me/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ChemistryCalculatorComponent,
    HeaderComponent,
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
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
