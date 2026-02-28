import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Container } from './shared/container/container';
import { Footer } from './components/footer/footer';
import { Board } from './components/board/board';
import { KeyHandle } from './services/key-handle';
import { DataService } from './services/data-service';
import { NgStyle } from '@angular/common';
import { mapResult } from './utils/helper';
import { DisplayResult } from './components/display-result/display-result';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Container, Footer, Board, NgStyle, DisplayResult],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('mywordle');

  keyCount = 0;
  success = false;
  result: { id: string; success: boolean; attempts: number }[] = [];
  resultMap = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };

  keyCountService = inject(KeyHandle);
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.keyCountService.keyStroke.subscribe(console.log);
    this.keyCountService.keyStroke.subscribe((count) => {
      this.keyCount = count;
    });

    this.dataService.success$.subscribe((success) => {
      this.success = success;
    });

    this.dataService.getResult().subscribe((result) => {
      this.result = result;
      this.resultMap = mapResult(result);
      console.log(result);
    });
  }
}
