import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequest {
  constructor(private http: HttpClient) {}

  private options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: '',
    },
  };

  async PostAsync(url: string, data: {}) {
    this.options.headers.Authorization = `Bearer ${sessionStorage.getItem('t')}`;
    return await this.http.post<any>(url, data, this.options).toPromise();
    //console.log(error)
    //throw new Error("Error del servidor");
  }

  async GetAsync(url: string, data: {} = {}) {
    this.options.headers.Authorization =
      'Bearer ' + sessionStorage.getItem('t');
    return await this.http.get<any>(url, this.options).toPromise();
  }
}
