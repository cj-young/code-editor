import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
}
