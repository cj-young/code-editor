import { Component } from '@angular/core';
import { NewSparkButtonComponent } from '../../ui/new-spark-button/new-spark-button.component';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent, NewSparkButtonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
