import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  success$ = new Subject<boolean>();

  getData(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/data');
  }

  setSuccess(value: boolean) {
    this.success$.next(value);
  }
}
