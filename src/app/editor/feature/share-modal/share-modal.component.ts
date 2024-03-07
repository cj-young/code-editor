import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../shared/feature/modal-service/modal.service';
import { CheckSvgComponent } from '../../../shared/ui/check-svg/check-svg.component';
import { XmarkSvgComponent } from '../../../shared/ui/xmark-svg/xmark-svg.component';

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
export class ShareModalComponent {
  sparkName: string = '';
  creatorName: string = '';
  addToGallery: boolean = false;
  constructor(private modalService: ModalService) {}

  onClose() {
    this.modalService.closeModal();
  }

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
  }
}
