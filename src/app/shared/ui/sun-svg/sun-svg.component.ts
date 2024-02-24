import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sun-svg',
  standalone: true,
  imports: [],
  templateUrl: './sun-svg.component.html',
  styles: ``,
})
export class SunSvgComponent implements OnInit {
  @Input() svgClass = '';

  ngOnInit(): void {}
}
