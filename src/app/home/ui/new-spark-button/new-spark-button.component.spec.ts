import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSparkButtonComponent } from './new-spark-button.component';

describe('NewSparkButtonComponent', () => {
  let component: NewSparkButtonComponent;
  let fixture: ComponentFixture<NewSparkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSparkButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSparkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
