import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmarkSvgComponent } from './xmark-svg.component';

describe('XmarkSvgComponent', () => {
  let component: XmarkSvgComponent;
  let fixture: ComponentFixture<XmarkSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmarkSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmarkSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
