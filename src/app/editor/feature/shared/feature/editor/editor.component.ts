import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Language } from '../../../../../shared/types/language';
import {
  ConsoleItem,
  ConsoleOutputComponent,
} from '../../../../ui/console-output/console-output.component';
import { SanitizeHtmlPipe } from '../../../../utils/sanitize-html.pipe';
import { EditorService } from '../../data-access/editor-service/editor.service';
import { EditorPanelComponent } from '../editor-panel/editor-panel.component';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';
import {
  Direction,
  ResizeableContainerComponent,
} from '../resizeable-container/resizeable-container.component';
import { ResizeableItemComponent } from '../resizeable-item/resizeable-item.component';
import iframeConfigCode from './iframe-config-code';

type EditorType = 'saved' | 'unsaved' | 'public';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
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
  consoleItems: ConsoleItem[] = [];

  mainDividerPos = 0.6;
  resizingMode: null | Direction = null;

  @ViewChild('desktopIframe') desktopIframe!: ElementRef;
  @ViewChild('mobileIframe') mobileIframe!: ElementRef;
  @ViewChild('dummyIframe') dummyIframe!: ElementRef;

  @Input() isLoading = true;
  @Input() type: EditorType = 'unsaved';

  constructor(
    private renderer: Renderer2,
    private editorScreenshotService: EditorScreenshotService,
    private editorService: EditorService
  ) {}

  get fullCode() {
    return `
    <html>
      <body>${this.editorService.inputCode.value.html}</body>
      <style>${this.editorService.inputCode.value.css}</style>  
      <script type="module">${iframeConfigCode}</script>
      <script type="module">${this.editorService.inputCode.value.javascript}</script>
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
    this.editorService.inputCode.subscribe((newCode) => {
      this.workingInputCode = structuredClone(newCode);
    });
  }

  ngAfterViewInit(): void {
    const dummyIframe = this.dummyIframe;
    this.editorScreenshotService.iframeElement = dummyIframe;
  }

  onSave(language: Language, newCode: string) {
    const currCode = this.editorService.inputCode.value;
    currCode[language] = newCode;
    this.editorService.inputCode.next(currCode);
    if (this.type === 'unsaved') {
      localStorage.setItem(
        'editorActiveSpark',
        JSON.stringify(this.editorService.inputCode.value)
      );
    }
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
