import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Auth } from '../models/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<Auth> {

  constructor(
    protected injector: Injector,
    public jwtHelper: JwtHelperService,
    private storege: LocalStorageService
  ) { 
    super(injector, "http://localhost:3000/api/login");
  }

  public isAuthenticated(): boolean {
    const token = this.storege.get("token");

    return !this.jwtHelper.isTokenExpired(token);
  }
}
