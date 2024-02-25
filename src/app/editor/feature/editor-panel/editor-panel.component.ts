import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LanguageFormatterPipe } from '../../../shared/feature/language-formatter-pipe/language-formatter.pipe';
import { Language } from '../../../shared/types/language';
import { LanguageToModePipePipe } from '../../utils/language-to-mode-pipe/language-to-mode-pipe.pipe';

const AUTO_SAVE_DELAY = 500;

@Component({
  selector: 'app-editor-panel',
  standalone: true,
  imports: [
    CodemirrorModule,
    FormsModule,
    LanguageFormatterPipe,
    LanguageToModePipePipe,
  ],
  templateUrl: './editor-panel.component.html',
  styles: `
    ::ng-deep .CodeMirror {
      height: 100% !important;
      max-height: 100% !important;
      max-width: 100% !important;
    }
  `,
})
export class EditorPanelComponent {
  private saveTimeout = 0;
  code = '';

  @Input() language: Language = 'javascript';
  @Output() onSave = new EventEmitter<string>();

  onChange() {
    clearTimeout(this.saveTimeout);
    this.saveTimeout = window.setTimeout(() => {
      this.saveCode();
    }, AUTO_SAVE_DELAY);
  }

  saveCode() {
    this.onSave.emit(this.code);
  }
}
