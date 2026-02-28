import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  success$ = new Subject<boolean>();

  getData(): Observable<{ id: number; word: string }[]> {
    return this.http.get<{ id: number; word: string }[]>('http://localhost:3000/data');
  }

  getResult(): Observable<{ id: string; success: boolean; attempts: number }[]> {
    return this.http.get<{ id: string; success: boolean; attempts: number }[]>(
      'http://localhost:3000/result',
    );
  }

  postData(data: { success: boolean; attempts: number }): Observable<any> {
    return this.http.post('http://localhost:3000/result', data);
  }

  setSuccess(value: boolean) {
    this.success$.next(value);
  }
}
