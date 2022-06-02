import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  page!: number;
  pageSize!: number;
  form!: FormGroup;
  response: any;
  users!: Array<User>;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.Carica();
    this.InizForm();
  }

  Carica() {
    this.authService.GetAll(0).subscribe((c) => {
      console.log(c);
      this.response = c;
      this.users = c.content;
    });
  }

  InizForm() {
    this.form = this.fb.group({
      Cerca: new FormControl(),
    });
  }

  CambiaPagina(p: number) {
    this.authService.GetAll(p).subscribe((res) => {
      this.response = res;
      this.users = res.content;
    });
  }

  counter(i: number) {
    return new Array(i);
  }
}
