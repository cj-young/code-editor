import { Component } from '@angular/core';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
