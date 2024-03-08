import { Component } from '@angular/core';
import { EditorComponent } from '../../../shared/feature/editor/editor.component';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';

@Component({
  selector: 'app-editor-container',
  standalone: true,
  imports: [EditorNavbarComponent, EditorComponent],
  templateUrl: './editor-container.component.html',
})
export class EditorContainerComponent {}
