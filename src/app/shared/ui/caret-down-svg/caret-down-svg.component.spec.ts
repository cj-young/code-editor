import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaretDownSvgComponent } from './caret-down-svg.component';

describe('CaretDownSvgComponent', () => {
  let component: CaretDownSvgComponent;
  let fixture: ComponentFixture<CaretDownSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaretDownSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaretDownSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
