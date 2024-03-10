import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditorService } from '../../../editor/feature/shared/data-access/editor-service/editor.service';
import { XmarkSvgComponent } from '../../ui/xmark-svg/xmark-svg.component';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { ModalService } from '../modal-service/modal.service';

@Component({
  selector: 'app-delete-spark-modal',
  standalone: true,
  imports: [XmarkSvgComponent],
  templateUrl: './delete-spark-modal.component.html',
  styles: `
  :host {
    width: min(100%, 30rem);
  }
`,
})
export class DeleteSparkModalComponent {
  constructor(
    private modalService: ModalService,
    private editorService: EditorService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  onClose() {
    this.modalService.closeModal();
  }

  async onConfirmDelete() {
    if (!this.editorService.sparkId.value) return;
    this.localStorageService.removeSpark(this.editorService.sparkId.value);
    await this.router.navigate(['']);
    this.onClose();
  }
}
