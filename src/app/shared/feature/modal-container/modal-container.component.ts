import { NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../modal-service/modal.service';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal-container.component.html',
})
export class ModalContainerComponent implements AfterViewInit {
  innerComponent: any;
  componentInputs: any;
  @ViewChild('dialog', { read: ElementRef })
  dialog!: ElementRef<HTMLDialogElement>;

  constructor(
    private modalService: ModalService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.modalService.modalComponent.subscribe((newComponent) => {
      this.innerComponent = newComponent?.component;
      this.componentInputs = newComponent?.inputs;
      if (newComponent) {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'block');
        this.dialog.nativeElement.showModal();
      } else {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        this.dialog.nativeElement.close();
      }
    });
  }

  onClick(e: MouseEvent) {
    if (
      e.target === this.element.nativeElement ||
      e.target === this.dialog.nativeElement
    ) {
      this.modalService.closeModal();
    }
  }

  onClose() {
    this.modalService.closeModal();
  }
}
