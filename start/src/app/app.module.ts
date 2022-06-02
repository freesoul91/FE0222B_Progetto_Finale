import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterInterceptor } from './interceptors/inter';
import { DettaglioClientiComponent } from './components/clienti/dettaglio-clienti/dettaglio-clienti.component';
import { ListaClientiComponent } from './components/clienti/lista-clienti/lista-clienti.component';
import { DettaglioFattureComponent } from './components/fatture/dettaglio-fatture/dettaglio-fatture.component';
import { ListaFattureComponent } from './components/fatture/lista-fatture/lista-fatture.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserlistComponent } from './components/userlist/userlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DettaglioClientiComponent,
    ListaClientiComponent,
    DettaglioFattureComponent,
    ListaFattureComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    UserlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
