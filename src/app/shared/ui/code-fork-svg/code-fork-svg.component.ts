import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-fork-svg',
  standalone: true,
  imports: [],
  templateUrl: './code-fork-svg.component.html',
  styles: ``,
})
export class CodeForkSvgComponent {
  @Input() svgClass = '';
}
