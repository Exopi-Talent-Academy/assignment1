import { AsyncPipe } from '@angular/common';
import { AfterViewInit, inject } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { KeyHandle } from '../../services/key-handle';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'app-board',
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit, AfterViewInit {

  @ViewChild('board') boardDiv : ElementRef;

  keyHandleService = inject(KeyHandle);
  dataService = inject(DataService);
  currentWord = '';
  allData: string [] = [];
  result = '';

  index = 0;

  board$ = new BehaviorSubject<string []>(new Array(36).fill(''));

  ngOnInit(): void {
    console.log("Display Data: .....")
   this.dataService.getData().subscribe(data => {
    this.allData = data;
    this.result = this.allData[Math.floor(Math.random() * data.length)];
    console.log(this.result);
   })
  }

  ngAfterViewInit() {
    this.boardDiv.nativeElement.focus();
    this.board$.subscribe(console.log);

  }

  yourMethod(event: KeyboardEvent){
    const regex = /[a-zA-Z]/;
    if(regex.test(event.key) && event.key.length === 1 && this.index < 36) {
      this.currentWord += event.key;
      this.keyHandleService.countKey(event.key);
      this.updateCell(event.key);
      this.index += 1;
      if(this.index % 6 === 0 && this.index !== 0) {
        this.boardDiv.nativeElement.blur();
        console.log(this.currentWord);
        setTimeout(() => {
          this.currentWord = '';
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
