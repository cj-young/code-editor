import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DeleteSparkModalComponent } from '../../../../../shared/feature/delete-spark-modal/delete-spark-modal.component';
import { LocalStorageService } from '../../../../../shared/feature/local-storage-service/local-storage.service';
import { LogoLinkComponent } from '../../../../../shared/feature/logo-link/logo-link.component';
import { ModalService } from '../../../../../shared/feature/modal-service/modal.service';
import { ThemeToggleComponent } from '../../../../../shared/feature/theme-toggle/theme-toggle.component';
import { FloppyDiskSvgComponent } from '../../../../../shared/ui/floppy-disk-svg/floppy-disk-svg.component';
import { ShareSvgComponent } from '../../../../../shared/ui/share-svg/share-svg.component';
import { TrashCanSvgComponent } from '../../../../../shared/ui/trash-can-svg/trash-can-svg.component';
import { EditorService } from '../../../shared/data-access/editor-service/editor.service';
import { EditorScreenshotService } from '../../../shared/feature/editor-screenshot/editor-screenshot.service';
import { ShareModalComponent } from '../../../shared/feature/share-modal/share-modal.component';

@Component({
  selector: 'app-saved-navbar',
  standalone: true,
  imports: [
    LogoLinkComponent,
    FloppyDiskSvgComponent,
    ThemeToggleComponent,
    ShareSvgComponent,
    TrashCanSvgComponent,
  ],
  templateUrl: './saved-navbar.component.html',
  styles: `
    :host {
      @apply w-full overflow-x-auto
    }
  `,
})
export class SavedNavbarComponent implements OnInit {
  isSaving = false;
  sparkName: string | null = null;
  constructor(
    private localStorageService: LocalStorageService,
    private editorScreenshotService: EditorScreenshotService,
    private editorService: EditorService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.editorService.sparkName.subscribe((newName) => {
      this.sparkName = newName;
    });
  }

  async onSave() {
    this.isSaving = true;
    const dataUrl = await this.editorScreenshotService.getScreenShot();
    if (!dataUrl) return;
    const sparkId = this.editorService.sparkId.value ?? uuidv4();
    const imageUrl = await this.editorScreenshotService.uploadThumbail(
      dataUrl,
      sparkId
    );

    this.localStorageService.addSpark(
      this.editorService.inputCode.getValue(),
      this.editorService.sparkName.value ?? '',
      sparkId,
      imageUrl
    );
  }

  onShareClick() {
    this.modalService.openModal(ShareModalComponent);
  }

  onDeleteClick() {
    this.modalService.openModal(DeleteSparkModalComponent);
  }
}
