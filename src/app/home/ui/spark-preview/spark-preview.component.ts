import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AbbreviateNumberPipe } from '../../../shared/feature/abbreviate-number-pipe/abbreviate-number.pipe';
import { EyeSvgComponent } from '../../../shared/ui/eye-svg/eye-svg.component';

export type SparkType = 'personal' | 'public';

@Component({
  selector: 'app-spark-preview',
  standalone: true,
  imports: [RouterLink, DatePipe, EyeSvgComponent, AbbreviateNumberPipe],
  templateUrl: './spark-preview.component.html',
})
export class SparkPreviewComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) imageUrl: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) type: SparkType = 'personal';
  @Input() creatorName?: string;
  @Input() createdAt?: Date;
  @Input() views?: number;
}
