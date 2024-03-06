import { Component } from '@angular/core';
import { LogoLinkComponent } from '../../../shared/feature/logo-link/logo-link.component';
import { ThemeToggleComponent } from '../../../shared/feature/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [LogoLinkComponent, ThemeToggleComponent],
  templateUrl: './home-navbar.component.html',
  styles: `
    :host {
      @apply w-full overflow-x-auto
    }
  `,
})
export class HomeNavbarComponent {}
