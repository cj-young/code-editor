import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { LanguageFormatterPipe } from '../../../shared/feature/language-formatter-pipe/language-formatter.pipe';
import { ThemeService } from '../../../shared/feature/theme-service/theme.service';
import { Language } from '../../../shared/types/language';
import { Theme } from '../../../shared/types/theme';
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

    :host {
      @apply w-full h-full
    }
  `,
})
export class EditorPanelComponent implements OnInit {
  private saveTimeout = 0;
  theme: Theme;

  @Input() language: Language = 'javascript';
  @Output() onSave = new EventEmitter<string>();

  @Input() code = '';
  @Output() codeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {
    this.theme = themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((newTheme) => {
      this.theme = newTheme;
    });
  }

  onChange() {
    this.codeChange.emit(this.code);
    clearTimeout(this.saveTimeout);
    this.saveTimeout = window.setTimeout(() => {
      this.saveCode();
    }, AUTO_SAVE_DELAY);
  }

  saveCode() {
    this.onSave.emit(this.code);
  }
}
