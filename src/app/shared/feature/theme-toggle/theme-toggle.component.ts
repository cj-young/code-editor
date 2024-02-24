import { Component, OnInit } from '@angular/core';
import { Theme } from '../../types/theme';
import { MoonSvgComponent } from '../../ui/moon-svg/moon-svg.component';
import { SunSvgComponent } from '../../ui/sun-svg/sun-svg.component';
import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MoonSvgComponent, SunSvgComponent],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent implements OnInit {
  theme: Theme;
  constructor(private themeService: ThemeService) {
    this.theme = themeService.getTheme();
  }

  onClick() {
    this.themeService.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((newTheme) => {
      this.theme = newTheme;
    });
  }
}
