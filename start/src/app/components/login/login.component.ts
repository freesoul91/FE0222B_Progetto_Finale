import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  item: any;
  form!: FormGroup;
  user!: User;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  accessLog(DatiForm: { value: any }) {
    console.log(0);
    console.log(DatiForm.value);
    this.item = DatiForm.value;
    this.authService.Login(this.item).subscribe((res) => {
      console.log(res);
      this.user = res;
      localStorage.setItem('utentecorrente', JSON.stringify(this.user));
      this.router.navigate(['/home']);
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.InizForm();
  }

  InizForm() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
  }
}
