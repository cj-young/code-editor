import { Component } from '@angular/core';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-editor-container',
  standalone: true,
  imports: [EditorNavbarComponent, EditorComponent],
  templateUrl: './editor-container.component.html',
})
export class EditorContainerComponent {}
