import { Component } from '@angular/core';
import { LogoLinkComponent } from '../../../shared/feature/logo-link/logo-link.component';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [LogoLinkComponent],
  templateUrl: './home-navbar.component.html',
  styles: ``,
})
export class HomeNavbarComponent {}
