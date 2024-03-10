import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eye-svg',
  standalone: true,
  imports: [],
  templateUrl: './eye-svg.component.html',
  styles: ``,
})
export class EyeSvgComponent {
  @Input() svgClass = '';
}
