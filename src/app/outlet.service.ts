import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import {Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
   path = environment.path;

constructor(private http: HttpClient, private router: Router) { }

  private handleError(err: HttpErrorResponse): Observable < any > {
  return Observable.throw(err);
}

outletByAddress(address: any) {
  return this.http.get(this.path + 'outletByAddress/?address=' + address.value);
}
}
