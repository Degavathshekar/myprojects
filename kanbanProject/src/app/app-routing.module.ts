import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to /home
  { path: 'home', component: HomeComponent }, // Route to HomeComponent
  { path: 'boards/:id', component: BoardComponent }, // Route to BoardComponent with an ID parameter
  { path: '**', redirectTo: '/home' } // Redirect unknown routes to /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
