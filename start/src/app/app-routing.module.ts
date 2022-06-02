import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListaClientiComponent } from './components/clienti/lista-clienti/lista-clienti.component';
import { DettaglioClientiComponent } from './components/clienti/dettaglio-clienti/dettaglio-clienti.component';
import { ListaFattureComponent } from './components/fatture/lista-fatture/lista-fatture.component';
import { DettaglioFattureComponent } from './components/fatture/dettaglio-fatture/dettaglio-fatture.component';
import { HomeComponent } from './components/home/home.component';
import { UserlistComponent } from './components/userlist/userlist.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lista', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  {
    path: 'clienti',
    component: ListaClientiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clienti/:id',
    component: DettaglioClientiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fatture',
    component: ListaFattureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fatture/cliente/:id',
    component: ListaFattureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fatture/:id',
    component: DettaglioFattureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fatture/:id/:idCliente',
    component: DettaglioFattureComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
