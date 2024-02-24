import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moon-svg',
  standalone: true,
  imports: [],
  templateUrl: './moon-svg.component.html',
})
export class MoonSvgComponent implements OnInit {
  @Input() svgClass = '';

  ngOnInit(): void {}
}
