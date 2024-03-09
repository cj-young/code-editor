import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-caret-down-svg',
  standalone: true,
  imports: [],
  templateUrl: './caret-down-svg.component.html',
  styles: ``,
})
export class CaretDownSvgComponent {
  @Input() svgClass = '';
}
