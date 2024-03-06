import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalComponent = new BehaviorSubject<
    { component: any; inputs?: any } | undefined
  >(undefined);
  constructor() {}

  openModal(component: any, inputs?: any) {
    this.modalComponent.next({ component, inputs });
  }

  closeModal() {
    this.modalComponent.next(undefined);
  }
}
