import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ResizeableItemComponent } from '../resizeable-item/resizeable-item.component';

type ItemNode = {
  item: ResizeableItemComponent;
  next?: ItemNode;
  prev?: ItemNode;
};

type HandleNode = {
  item: ResizeableItemComponent;
  prevItem?: ItemNode;
  nextItem?: ItemNode;
};

type DraggedHandle = {
  handle: HandleNode;
  cursorOffset: number;
} | null;

type Direction = 'row' | 'column';

@Component({
  selector: 'app-resizeable-container',
  standalone: true,
  imports: [ResizeableItemComponent],
  templateUrl: './resizeable-container.component.html',
})
export class ResizeableContainerComponent
  implements AfterViewInit, AfterContentInit
{
  private handles: HandleNode[] = [];
  private draggedHandle: DraggedHandle = null;

  @ContentChildren(ResizeableItemComponent)
  items!: QueryList<ResizeableItemComponent>;

  @Input() direction: Direction = 'row';

  @Output() isDragging = new EventEmitter<boolean>();

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.draggedHandle) return;
    let currentPos =
      this.direction === 'row'
        ? this.draggedHandle.handle.item.xPos
        : this.draggedHandle.handle.item.yPos;
    let delta: number;

    if (this.direction === 'row') {
      delta = e.clientX - (currentPos + this.draggedHandle.cursorOffset);
    } else {
      delta = e.clientY - (currentPos + this.draggedHandle.cursorOffset);
    }

    let { prevItem, nextItem } = this.draggedHandle.handle;

    while (prevItem && nextItem) {
      const prevLeftover =
        prevItem.item.getAddedPixelDims(delta).leftoverPixels;
      const nextLeftover = nextItem.item.getAddedPixelDims(
        -delta
      ).leftoverPixels;

      if (Math.abs(prevLeftover) > Math.abs(nextLeftover)) {
        const subDelta = delta - prevLeftover;
        prevItem.item.addPixelWidth(delta);
        nextItem.item.addPixelWidth(-subDelta);
        delta = prevLeftover;
        prevItem = prevItem.prev;
      } else {
        const subDelta = delta + nextLeftover;
        prevItem.item.addPixelWidth(subDelta);
        nextItem.item.addPixelWidth(-delta);
        delta = -nextLeftover;
        nextItem = nextItem.next;
      }
    }
  }

  ngAfterContentInit(): void {
    this.items.forEach((item) => {
      item.parentFlexDirection = this.direction;
    });
  }

  ngAfterViewInit(): void {
    this.buildLinkedList();
    for (let handle of this.handles) {
      handle.item.mouseDown.subscribe((e: MouseEvent) => {
        let offset: number;
        if (this.direction === 'row') {
          offset =
            e.clientX - (e.target as HTMLElement).getBoundingClientRect().left;
        } else {
          offset =
            e.clientY - (e.target as HTMLElement).getBoundingClientRect().top;
        }
        this.draggedHandle = {
          handle,
          cursorOffset: offset,
        };
        this.isDragging.emit(true);
      });
      handle.item.mouseUp.subscribe(() => {
        this.draggedHandle = null;
        this.isDragging.emit(false);
      });
    }
  }

  buildLinkedList() {
    let prevItem: ItemNode | undefined;
    this.items.forEach((item) => {
      if (item.type === 'item') {
        const itemNode: ItemNode = {
          item,
          prev: prevItem,
          next: undefined,
        };
        if (prevItem) prevItem.next = itemNode;
        prevItem = itemNode;
      } else if (item.type === 'handle') {
        const handleNode: HandleNode = {
          item,
          prevItem,
          nextItem: undefined,
        };
        this.handles.push(handleNode);
      }
    });

    if (!prevItem) return;
    const dummy: ItemNode = {
      item: prevItem?.item,
      prev: prevItem,
    };
    let revPrevItem: ItemNode | undefined = dummy;
    let handleIndex = this.handles.length - 1;
    this.items
      .toArray()
      .reverse()
      .forEach((item) => {
        if (!revPrevItem) return;
        if (item.type === 'handle') {
          const handleNode = this.handles[handleIndex];
          handleNode.nextItem = revPrevItem;
          handleIndex--;
        } else if (item.type === 'item') {
          revPrevItem = revPrevItem.prev;
        }
      });
  }
}
