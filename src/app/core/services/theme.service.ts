import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDarkMode = false;

  constructor(rendererFactory: RendererFactory2) {

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  checkTheme() {

    if (typeof localStorage !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        this.enableDarkMode();
      } else {
        this.enableLightMode();
      }
    } else {
      // Default to light mode
      this.enableLightMode();
    }
  }

  toggleTheme() {
    if (this.isDarkMode) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode() {
    this.renderer.addClass(document.body, 'dark-mode');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', 'dark');
    }
    this.isDarkMode = true;
  }

  private enableLightMode() {
    this.renderer.removeClass(document.body, 'dark-mode');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', 'light');
    }
    this.isDarkMode = false;
  }

  isCurrentThemeDark(): boolean {
    return this.isDarkMode;
  }
}