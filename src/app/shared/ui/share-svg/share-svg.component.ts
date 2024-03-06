import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-svg',
  standalone: true,
  imports: [],
  templateUrl: './share-svg.component.html',
  styles: ``,
})
export class ShareSvgComponent {
  @Input() svgClass = '';
}
