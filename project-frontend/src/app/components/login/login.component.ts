import { Component, OnInit } from '@angular/core';
import  {  FormControl,  FormGroup, Validators, FormBuilder  }  from  '@angular/forms';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = <any>[];

  constructor(
    private formBuilder: FormBuilder
  ) { 

  }

  ngOnInit(): void {
    this.createForm(new Login());
  }

  createForm(login: Login) {
    this.formLogin = this.formBuilder.group({
      user: [login.user, Validators.required],
      password: [login.password, Validators.required]
    });
  }

  // createForm(login: Login) {
  //   this.formLogin = new FormGroup({
  //     user: new FormControl(login.user, Validators.required),
  //     password: new FormControl(login.password, Validators.required)
  //   });
  // }

  get user(): any {
    return this.formLogin.get('user');
  }

  get password(): any {
    return this.formLogin.get('password');
  }

  onSubmit() {
    console.log(this.formLogin.value);

    this.formLogin.reset(new Login());
  }

  Clear() {
    this.formLogin.reset(new Login());
  }
}
