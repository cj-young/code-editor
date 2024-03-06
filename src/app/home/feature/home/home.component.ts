import { Component, OnInit } from '@angular/core';
import {
  LocalStorageService,
  PersonalSpark,
} from '../../../shared/feature/local-storage-service/local-storage.service';
import { NewSparkButtonComponent } from '../../ui/new-spark-button/new-spark-button.component';
import { SparkPreviewComponent } from '../../ui/spark-preview/spark-preview.component';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeNavbarComponent,
    NewSparkButtonComponent,
    SparkPreviewComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  personalSparks: PersonalSpark[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.personalSparks = this.localStorageService.getPersonalSparks();
  }
}
