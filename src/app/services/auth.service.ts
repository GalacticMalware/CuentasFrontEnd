import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { HttpResponse } from '../interfaces/httpResponse'
import { Login } from "../interfaces/auth";
import { Observable } from "rxjs";



@Injectable({providedIn: "root",})

export class AuthService{
    constructor(private http:HttpClient){}

    private URL = environment.SERVER;

    private options = {
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin':'*'
          },
          maxBodyLength: Infinity,
    }

    async singInUser(data:Object){  
        return await this.http.post<HttpResponse<null>>(`${this.URL}/User/Login`,data, this.options).toPromise();
      }

    validToken():Observable<HttpResponse<null>>{
      return this.http.get<HttpResponse<null>>(`${this.URL}/Auth/ValidToken`);
    }
}