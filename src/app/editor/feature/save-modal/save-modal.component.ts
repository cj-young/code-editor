import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../shared/feature/modal-service/modal.service';
import { XmarkSvgComponent } from '../../../shared/ui/xmark-svg/xmark-svg.component';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';

@Component({
  selector: 'app-save-modal',
  standalone: true,
  imports: [XmarkSvgComponent, FormsModule],
  templateUrl: './save-modal.component.html',
  styles: `
    :host {
      width: min(100%, 30rem);
    }
  `,
})
export class SaveModalComponent implements OnInit {
  sparkName = '';
  isLoading = false;
  screenshotDataUrl = '';
  @Input() screenshotPromise?: Promise<string>;
  constructor(
    private modalService: ModalService,
    private editorScreenshotService: EditorScreenshotService
  ) {}

  async ngOnInit(): Promise<void> {
    const dataUrl =
      (await this.editorScreenshotService.getScreenShot()) as string;
    this.screenshotDataUrl = dataUrl;
  }

  onClose() {
    this.modalService.closeModal();
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    console.log(this.screenshotDataUrl);
  }
}
