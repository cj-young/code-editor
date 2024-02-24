import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonSvgComponent } from './moon-svg.component';

describe('MoonSvgComponent', () => {
  let component: MoonSvgComponent;
  let fixture: ComponentFixture<MoonSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoonSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
