import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunSvgComponent } from './sun-svg.component';

describe('SunSvgComponent', () => {
  let component: SunSvgComponent;
  let fixture: ComponentFixture<SunSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SunSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
