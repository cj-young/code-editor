import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeableItemComponent } from './resizeable-item.component';

describe('ResizeableItemComponent', () => {
  let component: ResizeableItemComponent;
  let fixture: ComponentFixture<ResizeableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResizeableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResizeableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
