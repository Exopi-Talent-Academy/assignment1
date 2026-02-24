import { Component, inject, Input, OnInit } from '@angular/core';
import { KeyHandle } from '../../services/key-handle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  imports: [CommonModule],
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.scss',
})
export class Keyboard implements OnInit {
  keyHandleService = inject(KeyHandle);

  keysList = [];

  @Input() currentKey = '';

  @Input() keyPadColor = {};

  keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"]
  ]

  ngOnInit(): void {
    this.keyHandleService.keysList.subscribe(keysList => {
      this.keysList = keysList;
    })
  }

  keyExists(key: string){
    if(key !=='ENTER' && key !=='BACK') {
      if(this.keysList.includes(key)) {
        return 'green';
      }
    }
    return ''
    
  }

  takeInput(key: string) {
    console.log(key);
  }

  updateColor(key:string) {
    return this.keyPadColor[key.toLowerCase()];
  }
}
