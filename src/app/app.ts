import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Container } from './shared/container/container';
import { Keyboard } from './components/keyboard/keyboard';
import { Footer } from './components/footer/footer';
import { Board } from './components/board/board';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Container, Keyboard, Footer, Board],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mywordle');
}
