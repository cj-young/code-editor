import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerContainerComponent } from './viewer-container.component';

describe('ViewerContainerComponent', () => {
  let component: ViewerContainerComponent;
  let fixture: ComponentFixture<ViewerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
