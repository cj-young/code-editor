import { Component, OnInit } from '@angular/core';
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from '@angular/fire/firestore';
import {
  DbSparksService,
  PublicSpark,
  SPARK_QUERY_LIMIT,
} from '../../../shared/data-access/db-sparks-service/db-sparks.service';
import { SparkModel } from '../../../shared/data-access/spark-model/spark-model';
import { IntersectionObserverDirective } from '../../../shared/feature/intersection-observer-directive/intersection-observer.directive';
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

const NUM_SKELETON_SPARKS = 10;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeNavbarComponent,
    NewSparkButtonComponent,
    SparkPreviewComponent,
    DropdownSelectComponent,
    IntersectionObserverDirective,
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
  isAllSparksLoaded = false;
  skeletonSparksArray = new Array(NUM_SKELETON_SPARKS - 1);
  isLoadingPublicSparks = false;
  lastSparkSnap?: QueryDocumentSnapshot<SparkModel, DocumentData>;
  isIntersectingSparkLoader = false;

  constructor(
    private localStorageService: LocalStorageService,
    private dbSparksService: DbSparksService
  ) {}

  async ngOnInit(): Promise<void> {
    this.personalSparks = this.localStorageService.getPersonalSparks();
    await this.getNextPublicSparks();
    if (this.isIntersectingSparkLoader) {
      this.onIntersectionChange(true);
    }
  }

  onSortChange(newSort: GallerySort) {
    if (this.gallerySort !== newSort) {
      this.gallerySort = newSort;
      this.publicSparks = [];
      this.isAllSparksLoaded = false;
      this.lastSparkSnap = undefined;
      this.getNextPublicSparks();
    }
  }

  async getNextPublicSparks() {
    this.isLoadingPublicSparks = true;
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

    const sparkSnaps = await this.dbSparksService.getPublicSparks(
      sortField,
      sortOrder,
      this.lastSparkSnap
    );

    for (let snap of sparkSnaps) {
      if (!snap.exists()) continue;
      this.lastSparkSnap = snap;
      this.publicSparks.push({
        ...snap.data(),
        id: snap.id,
      });
    }

    if (sparkSnaps.length < SPARK_QUERY_LIMIT) {
      this.isAllSparksLoaded = true;
    }
    this.isLoadingPublicSparks = false;
  }

  getDateFromTimestamp(timeStamp: Timestamp) {
    return new Date(
      timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1_000_000
    );
  }

  async onIntersectionChange(isIntersecting: boolean) {
    this.isIntersectingSparkLoader = isIntersecting;
    if (!isIntersecting) return;
    if (this.isLoadingPublicSparks || this.isAllSparksLoaded) return;
    await this.getNextPublicSparks();
    this.onIntersectionChange(isIntersecting);
  }
}
