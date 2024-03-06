import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-xmark-svg',
  standalone: true,
  imports: [],
  templateUrl: './xmark-svg.component.html',
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class XmarkSvgComponent {
  @Input() svgClass = '';
}
