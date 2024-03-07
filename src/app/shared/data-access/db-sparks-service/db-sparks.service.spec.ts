import { TestBed } from '@angular/core/testing';

import { DbSparksService } from './db-sparks.service';

describe('FirestoreSparksService', () => {
  let service: DbSparksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbSparksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
