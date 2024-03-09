import { Component, OnInit } from '@angular/core';
import {
  LocalStorageService,
  PersonalSpark,
} from '../../../shared/feature/local-storage-service/local-storage.service';
import {
  DropdownOption,
  DropdownSelectComponent,
} from '../../../shared/ui/dropdown-select/dropdown-select.component';
import { NewSparkButtonComponent } from '../../ui/new-spark-button/new-spark-button.component';
import { SparkPreviewComponent } from '../../ui/spark-preview/spark-preview.component';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

type GallerySort = 'popular' | 'newest' | 'oldest';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeNavbarComponent,
    NewSparkButtonComponent,
    SparkPreviewComponent,
    DropdownSelectComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  personalSparks: PersonalSpark[] = [];
  gallerySort: GallerySort = 'popular';
  sortDropdownOptions: DropdownOption<string, GallerySort>[] = [
    { displayName: 'Popular', id: 'popular' },
    { displayName: 'Newest', id: 'newest' },
    { displayName: 'Oldest', id: 'oldest' },
  ];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.personalSparks = this.localStorageService.getPersonalSparks();
  }

  onSortChange(newSort: GallerySort) {
    this.gallerySort = newSort;
  }
}
