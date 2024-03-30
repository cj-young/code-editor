import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../types/theme';

const LOCAL_STORAGE_THEME_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<Theme>(this.loadTheme());
  currentTheme$ = this.currentTheme.asObservable();

  private loadTheme(): Theme {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (storedTheme !== 'light' && storedTheme !== 'dark') return DEFAULT_THEME;
    return storedTheme;
  }

  private saveTheme(theme: Theme) {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }

  getTheme(): Theme {
    return this.currentTheme.getValue();
  }

  setTheme(newTheme: Theme) {
    this.currentTheme.next(newTheme);
    this.saveTheme(newTheme);
  }
}
