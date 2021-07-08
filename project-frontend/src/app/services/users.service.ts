import { Injectable, Injector } from '@angular/core';
import { User } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {

  constructor(
    protected injector: Injector
  ) { 
    super(injector, "http://localhost:3000/api/clientes")
  }
}
