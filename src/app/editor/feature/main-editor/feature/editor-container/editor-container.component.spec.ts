import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorContainerComponent } from './editor-container.component';

describe('EditorContainerComponent', () => {
  let component: EditorContainerComponent;
  let fixture: ComponentFixture<EditorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
