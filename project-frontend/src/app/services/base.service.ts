import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Auth } from '../models/auth';


export abstract class BaseService<T> {
  protected http: HttpClient = <any>[];
  
  constructor(
    protected injector: Injector,
    protected uriAPI: string = "",
  ) { 
    this.http = this.injector.get(HttpClient);
  }

  public POST(data: string): Promise<T> {
    return this.http.post<T>(this.uriAPI, data)
    .pipe(
      map((res: T) => {return res}),      
    ).toPromise();
  }

  public GET(token: string): Observable<T[]> {
    try {
      let headers = new HttpHeaders({
        "Content-Type":  "application/json",
        "x-access-token": token.replace(/"/g,"")
      });
      return this.http.get<T[]>(this.uriAPI, { headers: headers })
      .pipe(
        tap(console.log)
      );
    } catch {
      return <any>[];
    }    
  }
} 
