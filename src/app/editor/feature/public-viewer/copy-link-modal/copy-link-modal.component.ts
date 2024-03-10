import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalService } from '../../../../shared/feature/modal-service/modal.service';
import { CopySvgComponent } from '../../../../shared/ui/copy-svg/copy-svg.component';
import { XmarkSvgComponent } from '../../../../shared/ui/xmark-svg/xmark-svg.component';

@Component({
  selector: 'app-copy-link-modal',
  standalone: true,
  imports: [XmarkSvgComponent, CopySvgComponent],
  templateUrl: './copy-link-modal.component.html',
  styles: `
    :host {
      width: min(100%, 30rem);
    }
  `,
})
export class CopyLinkModalComponent implements OnInit {
  sparkLink = '';
  message = '';

  constructor(
    private modalService: ModalService,
    private location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const path = this.location.path().split('?')[0];
    const origin = this.document.location.origin;
    this.sparkLink = origin + path;
  }

  onClose() {
    this.modalService.closeModal();
  }

  async copyLink() {
    try {
      await navigator.clipboard.writeText(this.sparkLink);
      this.message = 'Link copied to clipboard';
    } catch (error) {
      console.error(error);
      this.message = 'Failed to copy link to clipboard';
    }
  }
}
