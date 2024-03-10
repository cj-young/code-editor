import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-svg',
  standalone: true,
  imports: [],
  templateUrl: './copy-svg.component.html',
})
export class CopySvgComponent {
  @Input() svgClass = '';
}
