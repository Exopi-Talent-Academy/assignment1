import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);


  getData() : Observable<string []> {
    return this.http.get<string []>("http://localhost:3000/data");
  }
  
}
