import { Component, OnInit } from '@angular/core';
import  {  FormControl,  FormGroup, Validators, FormBuilder  }  from  '@angular/forms';
import { Login } from 'src/app/models/login';
import { Observable, Subject } from 'rxjs';
import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = <any>[];
  private auth = new Auth();
  public auth$: Promise<Auth> = <any>[];
  erroLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private stroge: LocalStorageService,
    private router: Router
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

  async onSubmit() {
    try {
      this.stroge.clear();
      this.erroLogin = false;
      this.auth$ = this.authService.POST(this.formLogin.value);
      let token = (await this.auth$).token;
      if(token) {
        this.stroge.set('token', token);
        this.router.navigate(['/home']);
      }
      this.formLogin.reset(new Login());
    } catch {
      this.erroLogin = true;
    } 
  }

  Clear() {  
    this.erroLogin = false;
    this.formLogin.reset();
  }
}
