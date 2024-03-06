import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSvgComponent } from './share-svg.component';

describe('ShareSvgComponent', () => {
  let component: ShareSvgComponent;
  let fixture: ComponentFixture<ShareSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
