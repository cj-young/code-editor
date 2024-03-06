import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../../../shared/feature/local-storage-service/local-storage.service';
import { ModalService } from '../../../shared/feature/modal-service/modal.service';
import { XmarkSvgComponent } from '../../../shared/ui/xmark-svg/xmark-svg.component';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';
import { EditorService } from '../editor-service/editor.service';

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
  screenshotDataUrl = new BehaviorSubject<string | undefined>(undefined);
  @Input() screenshotPromise?: Promise<string>;
  constructor(
    private modalService: ModalService,
    private editorScreenshotService: EditorScreenshotService,
    private fbStorage: Storage,
    private localStorageService: LocalStorageService,
    private editorService: EditorService
  ) {}

  async ngOnInit(): Promise<void> {
    const dataUrl =
      (await this.editorScreenshotService.getScreenShot()) as string;
    this.screenshotDataUrl.next(dataUrl);
  }

  onClose() {
    this.modalService.closeModal();
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.isLoading = true;
    this.screenshotDataUrl.subscribe(async (dataUrl) => {
      try {
        if (!dataUrl) return;
        const sparkId = uuidv4();
        const imageUrl = await this.editorScreenshotService.uploadThumbail(
          dataUrl,
          sparkId
        );

        this.localStorageService.addSpark(
          this.editorService.inputCode,
          this.sparkName,
          sparkId,
          imageUrl
        );
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
