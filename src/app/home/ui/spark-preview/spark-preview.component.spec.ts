import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkPreviewComponent } from './spark-preview.component';

describe('SparkPreviewComponent', () => {
  let component: SparkPreviewComponent;
  let fixture: ComponentFixture<SparkPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparkPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SparkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
