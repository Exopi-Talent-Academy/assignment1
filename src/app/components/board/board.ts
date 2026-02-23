import { AsyncPipe } from '@angular/common';
import { AfterViewInit, inject } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { KeyHandle } from '../../services/key-handle';

@Component({
  selector: 'app-board',
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit, AfterViewInit {

  @ViewChild('board') boardDiv : ElementRef;

  keyHandleService = inject(KeyHandle);

  index = 0;

  board$ = new BehaviorSubject<string []>(new Array(36).fill(''));

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    this.boardDiv.nativeElement.focus();
    this.board$.subscribe(console.log);

  }

  yourMethod(event: KeyboardEvent){
    const regex = /[a-zA-Z]/;
    if(regex.test(event.key) && event.key.length === 1 && this.index < 36) {
      this.keyHandleService.countKey(event.key);
      this.updateCell(event.key);
      this.index += 1;
      if(this.index % 6 === 0 && this.index !== 0) {
        this.boardDiv.nativeElement.blur();
        setTimeout(() => {
          this.boardDiv.nativeElement.focus();
        }, 1500 );
      }
      
    }  
  }

  updateCell(key: string){
    let currentBoard = [...this.board$.value];
      currentBoard[this.index] = key.toUpperCase();
      this.board$.next(currentBoard);
  }
}
