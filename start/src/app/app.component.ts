import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FE_0122B_ProgettoFinale';

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {}
}
