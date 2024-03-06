import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Language } from '../../../shared/types/language';
import {
  ConsoleItem,
  ConsoleOutputComponent,
} from '../../ui/console-output/console-output.component';
import { SanitizeHtmlPipe } from '../../utils/sanitize-html.pipe';
import { EditorNavbarComponent } from '../editor-navbar/editor-navbar.component';
import { EditorPanelComponent } from '../editor-panel/editor-panel.component';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';
import { EditorService } from '../editor-service/editor.service';
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
export class EditorComponent implements OnInit, AfterViewInit {
  workingInputCode: Record<Language, string> = {
    html: '',
    css: '',
    javascript: '',
  };
  workingHtml = '';
  consoleItems: ConsoleItem[] = [];

  mainDividerPos = 0.6;
  resizingMode: null | Direction = null;

  @ViewChild('desktopIframe') desktopIframe!: ElementRef;
  @ViewChild('mobileIframe') mobileIframe!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private editorScreenshotService: EditorScreenshotService,
    private editorService: EditorService
  ) {}

  get fullCode() {
    return `
    <html>
      <body>${this.editorService.inputCode.html}</body>
      <style>${this.editorService.inputCode.css}</style>  
      <script type="module">${iframeConfigCode}</script>
      <script type="module">${this.editorService.inputCode.javascript}</script>
    </html>`;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: MessageEvent) {
    const { data } = e;
    const desktopIframeElement = this.desktopIframe
      .nativeElement as HTMLIFrameElement;
    const mobileIframeElement = this.mobileIframe
      .nativeElement as HTMLIFrameElement;
    if (
      data.iframeName === 'output-desktop' &&
      getComputedStyle(desktopIframeElement).visibility !== 'visible'
    ) {
      return;
    }
    if (
      data.iframeName === 'output-mobile' &&
      getComputedStyle(mobileIframeElement).visibility !== 'visible'
    ) {
      return;
    }

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

  ngOnInit(): void {
    try {
      const currentActiveSpark = localStorage.getItem('editorActiveSpark');
      if (!currentActiveSpark) return;

      const parsedCode = JSON.parse(currentActiveSpark);
      this.workingInputCode = parsedCode;
      this.editorService.inputCode = structuredClone(parsedCode);
    } catch (error) {
      console.error(error);
    }
  }

  ngAfterViewInit(): void {
    const desktopIframeElement = this.desktopIframe;
    this.editorScreenshotService.iframeElement = desktopIframeElement;
  }

  onSave(language: Language, newCode: string) {
    console.log('on save running');
    this.editorService.inputCode[language] = newCode;
    localStorage.setItem(
      'editorActiveSpark',
      JSON.stringify(this.editorService.inputCode)
    );
  }

  onClearConsole() {
    this.consoleItems = [];
  }

  onDragChange(isDragging: null | Direction) {
    this.resizingMode = isDragging;
    this.renderer.setStyle(
      document.body,
      'user-select',
      isDragging ? 'none' : 'auto'
    );
  }
}
