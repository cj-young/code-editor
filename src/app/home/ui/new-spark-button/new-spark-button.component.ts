import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CirclePlusSvgComponent } from '../../../shared/ui/circle-plus-svg/circle-plus-svg.component';

@Component({
  selector: 'app-new-spark-button',
  standalone: true,
  imports: [CirclePlusSvgComponent, RouterLink],
  templateUrl: './new-spark-button.component.html',
})
export class NewSparkButtonComponent {}
