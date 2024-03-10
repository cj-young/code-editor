import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  DbSparksService,
  PublicSpark,
} from '../../../shared/data-access/db-sparks-service/db-sparks.service';
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
  publicSparks: PublicSpark[] = [];
  gallerySort: GallerySort = 'popular';
  sortDropdownOptions: DropdownOption<string, GallerySort>[] = [
    { displayName: 'Popular', id: 'popular' },
    { displayName: 'Newest', id: 'newest' },
    { displayName: 'Oldest', id: 'oldest' },
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private dbSparksService: DbSparksService
  ) {}

  ngOnInit(): void {
    this.personalSparks = this.localStorageService.getPersonalSparks();
    this.getNextPublicSparks();
  }

  onSortChange(newSort: GallerySort) {
    if (this.gallerySort !== newSort) {
      this.gallerySort = newSort;
      this.publicSparks = [];
      this.getNextPublicSparks();
    }
  }

  async getNextPublicSparks() {
    let sortField;
    let sortOrder;
    if (this.gallerySort === 'newest') {
      sortField = 'createdAt' as const;
      sortOrder = 'desc' as const;
    } else if (this.gallerySort === 'oldest') {
      sortField = 'createdAt' as const;
      sortOrder = 'asc' as const;
    } else if (this.gallerySort === 'popular') {
      sortField = 'views' as const;
      sortOrder = 'desc' as const;
    } else {
      return;
    }

    const newSparks = await this.dbSparksService.getPublicSparks(
      sortField,
      sortOrder,
      this.publicSparks.length > 0
        ? this.publicSparks[this.publicSparks.length - 1]
        : undefined
    );
    this.publicSparks.push(...newSparks);
  }

  getDateFromTimestamp(timeStamp: Timestamp) {
    return new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1_000_000
    );
  }
}
