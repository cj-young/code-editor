import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type SparkType = 'personal';

@Component({
  selector: 'app-spark-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spark-preview.component.html',
})
export class SparkPreviewComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) imageUrl: string = '';
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) type: SparkType = 'personal';
}
