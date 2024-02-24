import { Component } from '@angular/core';
import { LogoLinkComponent } from '../../../shared/feature/logo-link/logo-link.component';
import { ThemeToggleComponent } from '../../../shared/feature/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-editor-navbar',
  standalone: true,
  imports: [LogoLinkComponent, ThemeToggleComponent],
  templateUrl: './editor-navbar.component.html',
})
export class EditorNavbarComponent {}
