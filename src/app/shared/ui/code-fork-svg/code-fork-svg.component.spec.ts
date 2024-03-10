import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeForkSvgComponent } from './code-fork-svg.component';

describe('CodeForkSvgComponent', () => {
  let component: CodeForkSvgComponent;
  let fixture: ComponentFixture<CodeForkSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeForkSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeForkSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
