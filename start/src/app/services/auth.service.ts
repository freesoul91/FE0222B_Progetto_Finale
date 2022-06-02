import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  pathApi: string;
  private authSubj = new BehaviorSubject<null | User>(null);
  timeoutLogout: any;
  private userLoggedIn = new Subject<any>();
  private userLoggedOut = new Subject<any>();
  userLoggedIn$ = this.userLoggedIn.asObservable();
  userLoggedOut$ = this.userLoggedOut.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.pathApi = environment.pathApi;
  }

  GetAll(k: number) {
    console.log('getall');
    return this.http.get<any>(
      this.pathApi + '/api/users?page=' + k + '&size=20&sort=id,ASC'
    );
  }

  Signup(item: any) {
    console.log(item);
    return this.http.post<any>(this.pathApi + '/api/auth/signup', item);
  }

  Login(item: any) {
    console.log(item);
    return this.http.post<any>(this.pathApi + '/api/auth/login', item);
  }

  get isLogged(): boolean {
    return localStorage.getItem('utentecorrente') != null;
  }

  get Utente(): User {
    return (JSON.parse(localStorage.getItem('utentecorrente')) as User) || null;
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('utentecorrente');
    this.router.navigate(['']);
  }
}
