import { Component } from '@angular/core';
import { EditorComponent } from '../../shared/feature/editor/editor.component';
import { ViewerNavbarComponent } from '../viewer-navbar/viewer-navbar.component';

@Component({
  selector: 'app-viewer-container',
  standalone: true,
  imports: [ViewerNavbarComponent, EditorComponent],
  templateUrl: './viewer-container.component.html',
})
export class ViewerContainerComponent {}
