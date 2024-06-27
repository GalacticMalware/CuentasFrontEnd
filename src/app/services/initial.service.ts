import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { HttpResponse } from '../interfaces/httpResponse'
import { Observable } from "rxjs";
import {Initial} from '../interfaces/initial';

@Injectable({providedIn: "root",})

export default class InitialService{
    private http = inject(HttpClient);
    private URL = environment.SERVER;

    getData():Observable<HttpResponse<Initial>>{
        return this.http.get<HttpResponse<Initial>>(`${this.URL}/Initial/GetData`);
    }
}