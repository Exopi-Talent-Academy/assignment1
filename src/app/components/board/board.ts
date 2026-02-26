import { AsyncPipe } from '@angular/common';
import { AfterViewInit, inject, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject, Subject } from 'rxjs';
import { KeyHandle } from '../../services/key-handle';
import { DataService } from '../../services/data-service';
import { Keyboard } from '../keyboard/keyboard';

import { findColorForEachKey } from '../utils/helper';

@Component({
  selector: 'app-board',
  imports: [MatButtonModule, AsyncPipe, Keyboard],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit, AfterViewInit {

  @ViewChild('board') boardDiv : ElementRef;
  @ViewChildren('eachKey') allKeys : QueryList<ElementRef>;

  keyHandleService = inject(KeyHandle);
  dataService = inject(DataService);
  renderer = inject(Renderer2);
  currentWord = '';
  allData: string [] = [];
  result = '';

  index = 0;

  board$ = new BehaviorSubject<string []>(new Array(25).fill(''));
  keyPadColor = {};

  ngOnInit(): void {
   this.dataService.getData().subscribe(data => {
    this.allData = data;
    this.result = this.allData[Math.floor(Math.random() * data.length)];
   })

  }

  ngAfterViewInit() {
    this.boardDiv.nativeElement.focus();
  }

  getInputAndProcess(event: KeyboardEvent){
    const regex = /[a-zA-Z]/;
    if(regex.test(event.key) && event.key.length === 1 && this.index < 25) {
      this.currentWord += event.key;
      this.keyHandleService.countKey(event.key);
      this.updateCell(event.key);
      this.index += 1;
      if(this.index % 5 === 0 && this.index !== 0) {
        
        this.boardDiv.nativeElement.blur();
        this.displayDifferentColor();
        if(this.currentWord === this.result){
          this.boardDiv.nativeElement.blur();
          
        }else {
           setTimeout(() => {
          this.currentWord = '';
          this.boardDiv.nativeElement.focus();
        }, 1500 );
        }
       
      }
      
    }  
  }

  updateCell(key: string){
    let currentBoard = [...this.board$.value];
      currentBoard[this.index] = key.toUpperCase();
      this.board$.next(currentBoard);
  }

  displayResult() {
    let count = this.index - 5;
    this.allKeys.forEach((el:ElementRef, index )=> {
      if(count === index && count < this.index){
        this.renderer.addClass(el.nativeElement, 'animated');
        this.renderer.addClass(el.nativeElement, 'green');
        count ++;
      }
    })
  }

  displayDifferentColor() {
    let count = this.index - 5;
    let [matchedResult, keyPadColor] = findColorForEachKey(this.currentWord, this.result, this.keyPadColor);
    this.keyPadColor = keyPadColor;
    this.allKeys.forEach((el:ElementRef, index )=> {
      if(count === index && count < this.index){
        this.renderer.addClass(el.nativeElement, matchedResult[index % 5]);
        this.renderer.addClass(el.nativeElement, 'animated');
        count ++;
      }
    })
  }

  

  // showMessage(message: string) {
  //   this.message$.next(message);
  //   setTimeout(()=> {
  //     this.message$.next(null);
  //   }, 2000)
  // }
}
