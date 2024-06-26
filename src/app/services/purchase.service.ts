import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { HttpResponse } from '../interfaces/httpResponse'
import { Observable } from "rxjs";

@Injectable({providedIn: "root",})

export class PurchaseService{
    private http = inject(HttpClient);
    private URL = environment.SERVER;

    get():Observable<HttpResponse<null>>{
        return this.http.get<HttpResponse<null>>(`${this.URL}/Shopping/GetPurchase`);
    }

    register(data:object):Observable<HttpResponse<null>>{
        return this.http.post<HttpResponse<null>>(`${this.URL}/Shopping/PurchaseRgister`,data);
    }
}