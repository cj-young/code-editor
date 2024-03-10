import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../shared/feature/local-storage-service/local-storage.service';
import { LogoLinkComponent } from '../../../../shared/feature/logo-link/logo-link.component';
import { ThemeToggleComponent } from '../../../../shared/feature/theme-toggle/theme-toggle.component';
import { CodeForkSvgComponent } from '../../../../shared/ui/code-fork-svg/code-fork-svg.component';
import { EditorService } from '../../shared/data-access/editor-service/editor.service';

@Component({
  selector: 'app-viewer-navbar',
  standalone: true,
  imports: [LogoLinkComponent, ThemeToggleComponent, CodeForkSvgComponent],
  templateUrl: './viewer-navbar.component.html',
  styles: `
  :host {
    @apply w-full overflow-x-auto
  }
`,
})
export class ViewerNavbarComponent implements OnInit {
  sparkName: string | null = null;

  constructor(
    private editorService: EditorService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editorService.sparkName.subscribe((newName) => {
      this.sparkName = newName;
    });
  }

  onFork() {
    try {
      this.localStorageService.updateUnsavedEditor(
        this.editorService.inputCode.value
      );
      this.router.navigate(['/create']);
    } catch (error) {
      console.error(error);
    }
  }
}
