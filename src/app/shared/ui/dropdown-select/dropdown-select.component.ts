import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CaretDownSvgComponent } from '../caret-down-svg/caret-down-svg.component';

export type DropdownOption<DisplayType, IdType> = {
  displayName: DisplayType;
  id: IdType;
};

@Component({
  selector: 'app-dropdown-select',
  standalone: true,
  imports: [CaretDownSvgComponent],
  templateUrl: './dropdown-select.component.html',
})
export class DropdownSelectComponent<DisplayType, IdType> implements OnInit {
  instanceIdPrefix = uuidv4();
  isExpanded = false;
  selectedIndex = new BehaviorSubject(0);
  activeIndex = -1;
  shouldBlur = true;
  @Input() options: DropdownOption<DisplayType, IdType>[] = [];
  @Input() label: string = '';
  @Output() optionChange = new EventEmitter<IdType>();
  @ViewChild('container') container!: ElementRef;

  ngOnInit(): void {
    this.selectedIndex.subscribe((newIndex) => {
      this.activeIndex = newIndex;
      this.optionChange.emit(this.options[newIndex].id);
    });
  }

  onClick() {
    this.toggleExpand();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    this.activeIndex = this.selectedIndex.value;
  }

  onDropdownBlur() {
    if (!this.shouldBlur) {
      this.shouldBlur = true;
      return;
    }
    this.isExpanded = false;
  }

  onKeyDown(e: KeyboardEvent) {
    const { key } = e;
    if (key === 'ArrowDown') {
      if (!this.isExpanded) {
        this.toggleExpand();
        this.activeIndex = 0;
      } else {
        if (this.activeIndex < this.options.length - 1) {
          this.activeIndex++;
        }
      }
      e.stopPropagation();
      e.preventDefault();
    } else if (key === 'ArrowUp') {
      if (!this.isExpanded) {
        this.toggleExpand();
        this.activeIndex = this.options.length - 1;
      } else {
        if (this.activeIndex > 0) {
          this.activeIndex--;
        }
      }
      e.stopPropagation();
      e.preventDefault();
    } else if (key === 'Escape') {
      if (this.isExpanded) {
        this.toggleExpand();
      }
    } else if (key === 'Enter' || key === ' ') {
      if (this.isExpanded) {
        this.selectedIndex.next(this.activeIndex);
      }
      this.toggleExpand();
    }
  }

  getOptionHtmlId(index: number) {
    if (index < 0 || index > this.options.length) return '';
    return this.instanceIdPrefix + '-option-' + this.options[index].id;
  }

  onOptionMouseDown(e: MouseEvent) {
    this.shouldBlur = false;
  }

  onOptionClick(e: MouseEvent, optionIndex: number) {
    e.preventDefault();
    e.stopPropagation();
    this.selectedIndex.next(optionIndex);
    this.isExpanded = false;
  }
}
