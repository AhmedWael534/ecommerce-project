import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, AsyncPipe
import { ThemeService } from '../../../core/services/theme.service'; // Import ThemeService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _themeService: ThemeService // Inject ThemeService
  ) {
    // Listen to login status
    this._authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Check initial theme
    this.isDarkMode = this._themeService.isCurrentThemeDark();
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  toggleTheme() {
    this._themeService.toggleTheme();
    this.isDarkMode = this._themeService.isCurrentThemeDark();
  }
}