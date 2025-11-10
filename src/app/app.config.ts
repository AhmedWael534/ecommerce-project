import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    // Provide HttpClient and register interceptors
    provideHttpClient(withInterceptors([
      authInterceptor,
      loaderInterceptor
    ])),
    // Provide animations for NgxSpinner
    provideAnimations(),
    // Import modules
    importProvidersFrom(
      NgxSpinnerModule,
      ReactiveFormsModule // Make ReactiveForms available globally
    )
  ]
};

