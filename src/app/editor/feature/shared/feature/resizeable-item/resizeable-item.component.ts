import { PercentPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export type ItemType = 'item' | 'handle';

export type ParentDirection = 'row' | 'column';

@Component({
  selector: 'app-resizeable-item',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './resizeable-item.component.html',
  styles: `
    :host {
      @apply flex-shrink-0 min-w-0 min-h-0
    }
  `,
})
export class ResizeableItemComponent implements OnInit, AfterViewInit {
  // desired width * widthToGrowFactor = desired flex grow
  private widthToGrowFactor = 0;

  parentFlexDirection: ParentDirection = 'row';
  size: number = 0;
  @ViewChild('container', { read: ElementRef }) container!: ElementRef;
  @Input({ required: true }) type: ItemType = 'item';
  @Input({ transform: scaleInputSize }) initialSize: number = 0;
  @Input({ transform: scaleInputSize }) minSize = 0;
  @Input({ transform: scaleInputSize }) maxSize = Infinity;

  @Output() mouseDown = new EventEmitter<MouseEvent>();
  @Output() mouseUp = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostBinding('style.flex-grow') get flexGrow() {
    return this.type === 'item' ? this.size : 0;
  }
  @HostBinding('style.flex-basis') get flexBasis() {
    return this.type === 'item' ? 0 : undefined;
  }
  @HostBinding('style.width') get hostWidth() {
    return this.parentFlexDirection === 'row' ? undefined : '100%';
  }
  @HostBinding('style.height') get hostHeight() {
    return this.parentFlexDirection === 'column' ? undefined : '100%';
  }

  ngOnInit(): void {
    this.size = this.initialSize;
  }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    this.widthToGrowFactor =
      this.parentFlexDirection === 'row'
        ? this.size / element.offsetWidth
        : this.size / element.offsetHeight;
  }

  onMouseDown(e: MouseEvent) {
    this.mouseDown.emit(e);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    this.mouseUp.emit(e);
  }

  isNumber(obj: any) {
    return typeof obj === 'number';
  }

  addPixelWidth(pixels: number) {
    const { newSize } = this.getAddedPixelDims(pixels);
    this.size = newSize;
  }

  getAddedPixelDims(pixels: number) {
    if (pixels === 0) return { leftoverPixels: 0, newSize: this.size };
    if (pixels > 0 && this.size >= this.maxSize)
      return { leftoverPixels: pixels, newSize: this.size };
    if (pixels < 0 && this.size <= this.minSize)
      return { leftoverPixels: pixels, newSize: this.size };

    const element = this.elementRef.nativeElement as HTMLElement;
    const currentSize =
      this.parentFlexDirection === 'row'
        ? element.offsetWidth
        : element.offsetHeight;
    let newSize;
    let leftoverPixels = 0;
    if (this.size === 0) {
      const newWidthPx = pixels;
      newSize = newWidthPx * this.widthToGrowFactor;
    } else {
      const percentChange = pixels / currentSize;
      newSize = this.size * (1 + percentChange);
    }

    if (newSize < this.minSize) {
      const percentPixelsLeft =
        (this.minSize - newSize) / (this.size - newSize);
      leftoverPixels = percentPixelsLeft * pixels;
      newSize = this.minSize;
    } else if (newSize > this.maxSize) {
      const percentPixelsLeft =
        (newSize - this.maxSize) / (newSize - this.size);
      leftoverPixels = percentPixelsLeft * pixels;
      newSize = this.maxSize;
    }

    return { leftoverPixels, newSize };
  }

  get xPos() {
    const element = this.elementRef.nativeElement as HTMLElement;
    return element.getBoundingClientRect().left;
  }

  get yPos() {
    const element = this.elementRef.nativeElement as HTMLElement;
    return element.getBoundingClientRect().top;
  }
}

function scaleInputSize(size?: number) {
  return size !== undefined ? size * 1000 : size;
}
