import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyHandle {
  count = 0;
  keys = [];

  keyStroke = new BehaviorSubject<number>(0);
  keysList = new Subject<string[]>();

  /**
   * Takes a key as input and updates the key stroke count and the list of keys pressed. It emits the update count and the list of keys through the respective subject.
   * @param key
   * @example
   * // Create an instance of KeyHandle
   * const keyHandle = new KeyHandle();
   * // Count a key press
   * keyHandle.countKey('a');
   */

  countKey(key: string) {
    this.count += 1;
    this.keys.push(key);
    this.keyStroke.next(this.count);
    this.keysList.next(this.keys);
  }
}
