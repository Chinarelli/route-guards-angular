import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Auth } from '../models/auth';


export abstract class BaseService<T> {
  protected http: HttpClient = <any>[];
  
  constructor(
    protected injector: Injector,
    protected uriAPI: string = "",
  ) { 
    this.http = this.injector.get(HttpClient);
  }

  public POST(dataY: string): Observable<T> {
    return this.http.post<T>(this.uriAPI, dataY)
    .pipe(
      map((res: T) => {return res})
    );
  }


} 
