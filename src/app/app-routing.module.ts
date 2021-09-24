import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './admin/main/main.component';
import { FixtureComponent } from './components/fixture/fixture.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
  {
    path: '', component: GridComponent
  },
  {
    path: 'admin', component: MainComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
