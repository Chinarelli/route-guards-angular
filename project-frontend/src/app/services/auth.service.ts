import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Auth } from '../models/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<Auth> {

  constructor(
    protected injector: Injector
  ) { 
    super(injector, "http://localhost:3000/api/login");
  }
}
