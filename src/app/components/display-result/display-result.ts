import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-result',
  imports: [],
  templateUrl: './display-result.html',
  styleUrl: './display-result.scss',
})
export class DisplayResult {
  @Input() resultMap: {
    first: number;
    second: number;
    third: number;
    fourth: number;
    fifth: number;
    sixth: number;
  } = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };

  total() {
    return (
      this.resultMap.first +
      this.resultMap.second +
      this.resultMap.third +
      this.resultMap.fourth +
      this.resultMap.fifth +
      this.resultMap.sixth
    );
  }
}
