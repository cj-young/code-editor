import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../../shared/types/language';

@Pipe({
  name: 'languageToModePipe',
  standalone: true,
})
export class LanguageToModePipePipe implements PipeTransform {
  transform(value: Language, ...args: unknown[]): string {
    switch (value) {
      case 'javascript':
        return 'javascript';
      case 'css':
        return 'css';
      case 'html':
        return 'htmlembedded';
      default:
        return value;
    }
  }
}
