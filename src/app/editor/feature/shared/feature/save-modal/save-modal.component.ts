import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../../../../../shared/feature/local-storage-service/local-storage.service';
import { ModalService } from '../../../../../shared/feature/modal-service/modal.service';
import { XmarkSvgComponent } from '../../../../../shared/ui/xmark-svg/xmark-svg.component';
import { EditorService } from '../../data-access/editor-service/editor.service';
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
  screenshotDataUrl = new BehaviorSubject<string | undefined>(undefined);
  @Input() screenshotPromise?: Promise<string>;
  constructor(
    private modalService: ModalService,
    private editorScreenshotService: EditorScreenshotService,
    private localStorageService: LocalStorageService,
    private editorService: EditorService,
    private router: Router
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
    if (this.isLoading) return;
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
          this.editorService.inputCode.getValue(),
          this.sparkName,
          sparkId,
          imageUrl
        );
        this.router.navigate(['saved', sparkId]);
        this.onClose();
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
