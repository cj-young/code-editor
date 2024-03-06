import { TestBed } from '@angular/core/testing';

import { EditorScreenshotService } from './editor-screenshot.service';

describe('EditorScreenshotService', () => {
  let service: EditorScreenshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorScreenshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
