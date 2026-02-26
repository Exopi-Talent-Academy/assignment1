import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Container } from './shared/container/container';
import { Footer } from './components/footer/footer';
import { Board } from './components/board/board';
import { KeyHandle } from './services/key-handle';
import { DataService } from './services/data-service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Container, Footer, Board, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('mywordle');

  keyCount = 0;
  success = false;

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
  }
}
