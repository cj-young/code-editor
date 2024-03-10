import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trash-can-svg',
  standalone: true,
  imports: [],
  templateUrl: './trash-can-svg.component.html',
})
export class TrashCanSvgComponent {
  @Input() svgClass = '';
}
