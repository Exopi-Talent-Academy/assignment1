import { AsyncPipe } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements AfterViewInit {

  @ViewChild('board') boardDiv : ElementRef;

  index = 0;

  board$ = new BehaviorSubject<string []>(new Array(36).fill(''));


  ngAfterViewInit() {
    this.boardDiv.nativeElement.focus();
    this.board$.subscribe(console.log);
  }

  yourMethod(event: KeyboardEvent){
    const regex = /^[a-zA-Z]+$/;
    if(event.key !== "Tab" && regex.test(event.key) ){
      this.updateCell(event.key);
      this.index += 1;
    }
    
  }

  updateCell(key: string){
    let currentBoard = [...this.board$.value];
      currentBoard[this.index] = key.toUpperCase();
      this.board$.next(currentBoard);
  }
}
