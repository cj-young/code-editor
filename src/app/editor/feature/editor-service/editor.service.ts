import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../shared/feature/local-storage-service/local-storage.service';
import { Language } from '../../../shared/types/language';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  inputCode: Record<Language, string> = {
    html: '',
    css: '',
    javascript: '',
  };
  sparkName?: string;
  sparkId?: string;

  constructor(private localStorageService: LocalStorageService) {}
}
