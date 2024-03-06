import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEditorContainerComponent } from './saved-editor-container.component';

describe('SavedEditorContainerComponent', () => {
  let component: SavedEditorContainerComponent;
  let fixture: ComponentFixture<SavedEditorContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedEditorContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedEditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
