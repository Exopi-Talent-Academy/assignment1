import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [MatButtonModule, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {

  index = 0;

  board = new BehaviorSubject<string []>(new Array(36));

  ngOnInit() {
  }

  yourMethod(event: KeyboardEvent){
    const regex = /^[a-zA-Z]+$/;
    if(event.key !== "Tab" && regex.test(event.key) ){
      this.updateCell(event.key);
      this.index += 1;
    }
    
  }

  updateCell(key: string){
    let currentBoard = [...this.board.value];
      currentBoard[this.index] = key.toUpperCase();
      this.board.next(currentBoard);
  }
}
