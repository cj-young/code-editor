import { Component, HostListener } from '@angular/core';
import { Language } from '../../../shared/types/language';
import {
  ConsoleItem,
  ConsoleOutputComponent,
} from '../../ui/console-output/console-output.component';
import { SanitizeHtmlPipe } from '../../utils/sanitize-html.pipe';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';
import { EditorPanelComponent } from '../editor-panel/editor-panel.component';
import {
  Direction,
  ResizeableContainerComponent,
} from '../resizeable-container/resizeable-container.component';
import { ResizeableItemComponent } from '../resizeable-item/resizeable-item.component';
import iframeConfigCode from './iframe-config-code';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    EditorNavbarComponent,
    EditorPanelComponent,
    SanitizeHtmlPipe,
    ConsoleOutputComponent,
    ResizeableContainerComponent,
    ResizeableItemComponent,
  ],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  inputCode: Record<Language, string> = {
    html: '',
    css: '',
    javascript: '',
  };
  consoleItems: ConsoleItem[] = [];

  mainDividerPos = 0.6;
  resizingMode: null | Direction = null;

  get fullCode() {
    return `
    <html>
      <body>${this.inputCode.html}</body>
      <style>${this.inputCode.css}</style>  
      <script type="module">${iframeConfigCode}</script>
      <script type="module">${this.inputCode.javascript}</script>
    </html>`;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent) {
    const { data } = e;
    if (data.type === 'error') {
      const { message, source, error } = data as {
        message: string;
        source: string;
        error: Error;
      };
      this.consoleItems.push({ message, source, error, type: 'error' });
    } else if (data.type === 'log') {
      const { message } = data as { message: string };
      this.consoleItems.push({ message, type: 'log' });
    } else if (data.type === 'warn') {
      const { message } = data as { message: string };
      this.consoleItems.push({ message, type: 'warn' });
    } else if (data.type === 'clear') {
      this.onClearConsole();
    }
  }

  onSave(language: Language, newCode: string) {
    this.inputCode[language] = newCode;
  }

  onClearConsole() {
    this.consoleItems = [];
  }

  onDragChange(isDragging: null | Direction) {
    this.resizingMode = isDragging;
  }
}
