import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../../../shared/feature/local-storage-service/local-storage.service';
import { Language } from '../../../../../shared/types/language';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  inputCode = new BehaviorSubject<Record<Language, string>>({
    html: '',
    css: '',
    javascript: '',
  });
  sparkName = new BehaviorSubject<string | null>(null);
  sparkId = new BehaviorSubject<string | null>(null);

  constructor(private localStorageService: LocalStorageService) {}
}
