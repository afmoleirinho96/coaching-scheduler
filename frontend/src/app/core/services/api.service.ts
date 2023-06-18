import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSomeData(): Observable<any> {
    console.error("here");
    return this.http.get<any>(`${environment.apiUrl}/hello`).pipe(tap((data) => console.error(data)));
  }
}
