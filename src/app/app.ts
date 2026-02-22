import { Component, inject, OnInit, signal, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Container } from './shared/container/container';
import { Keyboard } from './components/keyboard/keyboard';
import { Footer } from './components/footer/footer';
import { Board } from './components/board/board';
import { KeyHandle } from './services/key-handle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Container, Keyboard, Footer, Board, ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('mywordle');

  keyCountService = inject(KeyHandle);

  ngOnInit(): void {
    this.keyCountService.keyStroke.subscribe(console.log);
  }
}
