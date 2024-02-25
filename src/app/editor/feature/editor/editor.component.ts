import { Component, OnInit } from '@angular/core';
import { SanitizeHtmlPipe } from '../../utils/sanitize-html.pipe';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';
import { EditorPanelComponent } from '../editor-panel/editor-panel.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [EditorNavbarComponent, EditorPanelComponent, SanitizeHtmlPipe],
  templateUrl: './editor.component.html',
})
export class EditorComponent implements OnInit {
  htmlCode = '';
  cssCode = '';
  jsCode = '';
  fullCode = '';

  ngOnInit(): void {
    this.updateFullCode();
  }

  onHtmlSave(newCode: string) {
    this.htmlCode = newCode;
    this.updateFullCode();
  }

  onCssSave(newCode: string) {
    this.cssCode = newCode;

    this.updateFullCode();
  }

  onJsSave(newCode: string) {
    this.jsCode = newCode;
    this.updateFullCode();
  }

  private updateFullCode() {
    this.fullCode = `<html>
      <body>${this.htmlCode}</body>
      <style>${this.cssCode}</style>
      <script>${this.jsCode}</script>
    </html>`;
    console.log(this.fullCode);
  }
}
