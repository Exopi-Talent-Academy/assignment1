import { AsyncPipe } from '@angular/common';
import { AfterViewInit, inject, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject, Subject } from 'rxjs';
import { KeyHandle } from '../../services/key-handle';
import { DataService } from '../../services/data-service';
import { Keyboard } from '../keyboard/keyboard';

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
  currentWord = '';
  allData: string [] = [];
  result = '';

  index = 0;

  board$ = new BehaviorSubject<string []>(new Array(25).fill(''));

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit(): void {
    console.log("Display Data: .....")
   this.dataService.getData().subscribe(data => {
    console.log(data);
    this.allData = data;
    this.result = this.allData[Math.floor(Math.random() * data.length)];
    console.log(this.result);
   })

  }

  ngAfterViewInit() {
    this.boardDiv.nativeElement.focus();
    this.board$.subscribe();

  }

  yourMethod(event: KeyboardEvent){
    const regex = /[a-zA-Z]/;
    if(regex.test(event.key) && event.key.length === 1 && this.index < 25) {
      this.currentWord += event.key;
      this.keyHandleService.countKey(event.key);
      this.updateCell(event.key);
      this.index += 1;
      if(this.index % 5 === 0 && this.index !== 0) {
        
        this.boardDiv.nativeElement.blur();
        console.log(this.currentWord);
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
        // console.log(el.nativeElement);
        count ++;
      }
    })
  }

  displayDifferentColor() {
    let count = this.index - 5;
    let matchedResult = this.findColors();
    console.log(matchedResult);
    this.allKeys.forEach((el:ElementRef, index )=> {
      if(count === index && count < this.index){
        console.log('index is: ',index)
        this.renderer.addClass(el.nativeElement, matchedResult[index % 5]);
        this.renderer.addClass(el.nativeElement, 'animated');
        count ++;
      }
    })
  }

  findColors() {
    let matchedResult = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: ''
    };
    let currentWord = this.currentWord.split('');
    let result = this.result.split('');
    currentWord.forEach((char, index) => {
      if(currentWord[index] === result[index]) {
        matchedResult[index] = "green";
        currentWord[index] = '';
        result[index] = '';
      }
    })
    console.log('first ', matchedResult);
    currentWord.forEach((char, index) => {
      if(result.includes(char)) {
        if(!char){
          return;
        }
        matchedResult[index] = 'yellow';
        currentWord[index] = '';
        let indexInResult = result.indexOf(char);
        result[indexInResult] = '';
      }else {
        matchedResult[index] = 'black';
      }
      
    })


    return matchedResult;
  }

  // showMessage(message: string) {
  //   this.message$.next(message);
  //   setTimeout(()=> {
  //     this.message$.next(null);
  //   }, 2000)
  // }
}
