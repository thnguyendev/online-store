import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent, children: [
      { path: '', component: HomeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollOffset: [0, 80],
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
