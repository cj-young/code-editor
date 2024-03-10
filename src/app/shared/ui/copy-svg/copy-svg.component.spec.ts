import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopySvgComponent } from './copy-svg.component';

describe('CopySvgComponent', () => {
  let component: CopySvgComponent;
  let fixture: ComponentFixture<CopySvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopySvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopySvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
