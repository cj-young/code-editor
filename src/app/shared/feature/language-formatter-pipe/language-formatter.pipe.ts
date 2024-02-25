import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../types/language';

@Pipe({
  name: 'languageFormatter',
  standalone: true,
})
export class LanguageFormatterPipe implements PipeTransform {
  transform(value: Language, short: boolean = false): string {
    switch (value) {
      case 'css':
        if (short) return 'CSS';
        return 'CSS';
      case 'html':
        if (short) return 'HTML';
        return 'HTML';
      case 'javascript':
        if (short) return 'JS';
        return 'JavaScript';
      default:
        return value;
    }
  }
}
