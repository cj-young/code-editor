import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../../shared/data-access/editor-service/editor.service';
import { EditorComponent } from '../../../shared/feature/editor/editor.component';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';

@Component({
  selector: 'app-editor-container',
  standalone: true,
  imports: [EditorNavbarComponent, EditorComponent],
  templateUrl: './editor-container.component.html',
})
export class EditorContainerComponent implements OnInit {
  isLoading = true;
  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    try {
      const currentActiveSpark = localStorage.getItem('editorActiveSpark');
      if (!currentActiveSpark) {
        this.isLoading = false;
        return;
      }

      const parsedCode = JSON.parse(currentActiveSpark);
      this.editorService.inputCode.next(structuredClone(parsedCode));
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }
}
