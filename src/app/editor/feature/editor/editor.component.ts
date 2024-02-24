import { Component } from '@angular/core';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorNavbarComponent],
  templateUrl: './editor.component.html',
})
export class EditorComponent {}
