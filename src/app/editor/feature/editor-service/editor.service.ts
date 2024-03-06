import { Injectable } from '@angular/core';
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

  constructor() {}
}
