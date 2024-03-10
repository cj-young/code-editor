import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashCanSvgComponent } from './trash-can-svg.component';

describe('TrashCanSvgComponent', () => {
  let component: TrashCanSvgComponent;
  let fixture: ComponentFixture<TrashCanSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashCanSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrashCanSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
