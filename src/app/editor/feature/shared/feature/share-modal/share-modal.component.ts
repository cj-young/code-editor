import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { DbSparksService } from '../../../../../shared/data-access/db-sparks-service/db-sparks.service';
import { ModalService } from '../../../../../shared/feature/modal-service/modal.service';
import { CheckSvgComponent } from '../../../../../shared/ui/check-svg/check-svg.component';
import { XmarkSvgComponent } from '../../../../../shared/ui/xmark-svg/xmark-svg.component';
import { EditorService } from '../../data-access/editor-service/editor.service';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [XmarkSvgComponent, FormsModule, CheckSvgComponent],
  templateUrl: './share-modal.component.html',
  styles: `
    :host {
      width: min(100%, 30rem);
    }
  `,
})
export class ShareModalComponent implements OnInit {
  sparkName: string = '';
  creatorName: string = '';
  addToGallery: boolean = false;
  imageUrl = new BehaviorSubject<string | undefined>(undefined);
  isLoading = false;
  constructor(
    private modalService: ModalService,
    private dbSparksService: DbSparksService,
    private editorService: EditorService,
    private editorScreenshotService: EditorScreenshotService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const dataUrl =
      (await this.editorScreenshotService.getScreenShot()) as string;
    console.log(dataUrl);
    const id = uuidv4();
    const imageUrl = await this.editorScreenshotService.uploadThumbail(
      dataUrl,
      id
    );
    this.imageUrl.next(imageUrl);
  }

  onClose() {
    this.modalService.closeModal();
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.imageUrl.subscribe(async (newImageUrl) => {
      if (!newImageUrl) return;
      try {
        const docId = await this.dbSparksService.uploadSpark({
          code: {
            html: this.editorService.inputCode.value.html,
            css: this.editorService.inputCode.value.css,
            javascript: this.editorService.inputCode.value.javascript,
          },
          name: this.sparkName,
          isInGallery: this.addToGallery,
          imageUrl: newImageUrl,
          creatorName: this.creatorName,
        });
        await this.router.navigate(['public-spark', docId]);
        this.onClose();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
