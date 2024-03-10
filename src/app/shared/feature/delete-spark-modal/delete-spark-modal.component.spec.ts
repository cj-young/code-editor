import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSparkModalComponent } from './delete-spark-modal.component';

describe('DeleteSparkModalComponent', () => {
  let component: DeleteSparkModalComponent;
  let fixture: ComponentFixture<DeleteSparkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSparkModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSparkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
