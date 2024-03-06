import { Component } from '@angular/core';
import { LogoLinkComponent } from '../../../shared/feature/logo-link/logo-link.component';
import { ModalService } from '../../../shared/feature/modal-service/modal.service';
import { ThemeToggleComponent } from '../../../shared/feature/theme-toggle/theme-toggle.component';
import { FloppyDiskSvgComponent } from '../../../shared/ui/floppy-disk-svg/floppy-disk-svg.component';
import { SaveModalComponent } from '../save-modal/save-modal.component';

@Component({
  selector: 'app-editor-navbar',
  standalone: true,
  imports: [LogoLinkComponent, ThemeToggleComponent, FloppyDiskSvgComponent],
  templateUrl: './editor-navbar.component.html',
})
export class EditorNavbarComponent {
  constructor(private modalService: ModalService) {}

  onClick() {
    this.modalService.openModal(SaveModalComponent);
  }
}
