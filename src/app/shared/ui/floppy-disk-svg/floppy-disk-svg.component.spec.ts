import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloppyDiskSvgComponent } from './floppy-disk-svg.component';

describe('FloppyDiskSvgComponent', () => {
  let component: FloppyDiskSvgComponent;
  let fixture: ComponentFixture<FloppyDiskSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloppyDiskSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloppyDiskSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
