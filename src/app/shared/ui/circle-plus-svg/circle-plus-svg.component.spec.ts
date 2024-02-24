import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePlusSvgComponent } from './circle-plus-svg.component';

describe('CirclePlusSvgComponent', () => {
  let component: CirclePlusSvgComponent;
  let fixture: ComponentFixture<CirclePlusSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirclePlusSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CirclePlusSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
