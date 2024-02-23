import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>('dark');
  currentTheme$ = this.currentTheme.asObservable();

  getTheme(): Theme {
    return this.currentTheme.getValue();
  }

  setTheme(newTheme: Theme) {
    this.currentTheme.next(newTheme);
  }
}
