import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLinkModalComponent } from './copy-link-modal.component';

describe('CopyLinkModalComponent', () => {
  let component: CopyLinkModalComponent;
  let fixture: ComponentFixture<CopyLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyLinkModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
