import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyHandle {

  count = 0;
  keys = [];

  keyStroke = new BehaviorSubject<number>(0);
  keysList = new Subject<string []>()

  countKey(key: string) {
    this.count += 1;
    this.keys.push(key)
    this.keyStroke.next(this.count);
    this.keysList.next(this.keys);
  }
}
