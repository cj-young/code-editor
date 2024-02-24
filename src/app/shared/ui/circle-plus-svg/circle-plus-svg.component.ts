import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-plus-svg',
  standalone: true,
  imports: [],
  templateUrl: './circle-plus-svg.component.html',
})
export class CirclePlusSvgComponent {
  @Input() svgClass = '';
}
