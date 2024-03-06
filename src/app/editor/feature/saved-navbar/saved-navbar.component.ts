import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { LocalStorageService } from '../../../shared/feature/local-storage-service/local-storage.service';
import { LogoLinkComponent } from '../../../shared/feature/logo-link/logo-link.component';
import { ThemeToggleComponent } from '../../../shared/feature/theme-toggle/theme-toggle.component';
import { FloppyDiskSvgComponent } from '../../../shared/ui/floppy-disk-svg/floppy-disk-svg.component';
import { EditorScreenshotService } from '../editor-screenshot/editor-screenshot.service';
import { EditorService } from '../editor-service/editor.service';

@Component({
  selector: 'app-saved-navbar',
  standalone: true,
  imports: [LogoLinkComponent, FloppyDiskSvgComponent, ThemeToggleComponent],
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
    private editorService: EditorService
  ) {}

  ngOnInit(): void {
    this.editorService.sparkName.subscribe((newName) => {
      console.log('THE SPARK NAME CHANGEDDDD');
      console.log(newName);
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
}
