import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/feature/theme-service/theme.service';
import { Theme } from './shared/types/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private currentTheme: Theme;
  constructor(private renderer: Renderer2, private themeService: ThemeService) {
    this.currentTheme = themeService.getTheme();
  }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe((newTheme) => {
      this.renderer.removeClass(document.body, this.currentTheme);
      this.renderer.addClass(document.body, newTheme);
      this.currentTheme = newTheme;
    });
  }
}
