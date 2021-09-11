import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './admin/main/main.component';
import { FixtureComponent } from './components/fixture/fixture.component';

const routes: Routes = [
  {
    path: '', component: FixtureComponent
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
