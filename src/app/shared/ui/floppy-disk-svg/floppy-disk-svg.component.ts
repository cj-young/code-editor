import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floppy-disk-svg',
  standalone: true,
  imports: [],
  templateUrl: './floppy-disk-svg.component.html',
})
export class FloppyDiskSvgComponent {
  @Input() svgClass = '';
}
