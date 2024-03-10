import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver;

  @Input() observerOptions: IntersectionObserverInit = {};
  @Output() intersectionChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.intersectionChange.emit(true);
        } else {
          this.intersectionChange.emit(false);
        }
      });
    }, this.observerOptions);
  }

  ngOnInit(): void {
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
