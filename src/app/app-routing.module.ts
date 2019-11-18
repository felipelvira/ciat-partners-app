import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnersComponent } from './components/partners/partners.component'
import { AddPartnertsComponent } from './components/add-partners/add-partners.component'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-partners' },
  { path: 'partners', component: PartnersComponent },
  { path: 'add-partners', component: AddPartnertsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
