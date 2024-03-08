import { Component, OnInit } from '@angular/core';
import { LogoLinkComponent } from '../../../../shared/feature/logo-link/logo-link.component';
import { ThemeToggleComponent } from '../../../../shared/feature/theme-toggle/theme-toggle.component';
import { EditorService } from '../../shared/data-access/editor-service/editor.service';

@Component({
  selector: 'app-viewer-navbar',
  standalone: true,
  imports: [LogoLinkComponent, ThemeToggleComponent],
  templateUrl: './viewer-navbar.component.html',
  styles: `
  :host {
    @apply w-full overflow-x-auto
  }
`,
})
export class ViewerNavbarComponent implements OnInit {
  sparkName: string | null = null;

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {
    this.editorService.sparkName.subscribe((newName) => {
      this.sparkName = newName;
    });
  }
}
