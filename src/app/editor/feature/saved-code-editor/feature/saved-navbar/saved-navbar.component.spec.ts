import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedNavbarComponent } from './saved-navbar.component';

describe('SavedNavbarComponent', () => {
  let component: SavedNavbarComponent;
  let fixture: ComponentFixture<SavedNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
