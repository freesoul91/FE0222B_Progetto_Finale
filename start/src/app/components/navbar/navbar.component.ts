import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  isLogged: boolean = false;
  utente = User;

  constructor(private authSrv: AuthService) {}

  ngOnInit() {
    if (this.authSrv.Utente) {
      this.isLogged = true;
    }
  }

  logout() {
    this.authSrv.logout();
    this.isLogged = false;
  }
}
