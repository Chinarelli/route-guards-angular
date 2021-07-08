import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]> = <any>[];

  constructor(
    private userService : UsersService,
    private storage: LocalStorageService
  ) { 

  }

  ngOnInit(): void {
    try{
      this.users$ = this.userService.GET(this.storage.get("token"));
    } catch {
      alert("Falha ao obter lista de usuarios.");
    }  
  }

}
