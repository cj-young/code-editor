import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeSvgComponent } from './eye-svg.component';

describe('EyeSvgComponent', () => {
  let component: EyeSvgComponent;
  let fixture: ComponentFixture<EyeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EyeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
