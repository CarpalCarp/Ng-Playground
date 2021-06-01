import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { ChemistryCalculatorComponent } from './chemistry-calculator/chemistry-calculator.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  { path: 'about-me', component: AboutMeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'chemistry', component: ChemistryCalculatorComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'more', component: MoreComponent },
  { path: '*', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
