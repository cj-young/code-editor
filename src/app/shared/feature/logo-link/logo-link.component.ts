import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Theme } from '../../types/theme';
import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'app-logo-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo-link.component.html',
})
export class LogoLinkComponent implements OnInit {
  theme: Theme;
  constructor(private themeService: ThemeService) {
    this.theme = themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((newTheme) => {
      this.theme = newTheme;
    });
  }
}
