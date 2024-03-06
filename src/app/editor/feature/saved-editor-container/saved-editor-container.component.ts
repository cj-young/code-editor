import { Component } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { SavedNavbarComponent } from '../saved-navbar/saved-navbar.component';

@Component({
  selector: 'app-saved-editor-container',
  standalone: true,
  imports: [EditorComponent, SavedNavbarComponent],
  templateUrl: './saved-editor-container.component.html',
  styles: ``,
})
export class SavedEditorContainerComponent {}
