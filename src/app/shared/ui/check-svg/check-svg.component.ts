import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-svg',
  standalone: true,
  imports: [],
  templateUrl: './check-svg.component.html',
})
export class CheckSvgComponent {
  @Input() svgClass = '';
}
