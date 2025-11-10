import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if token exists in local storage
  if (localStorage.getItem('userToken')) {
    return true; // User is logged in, allow access
  } else {
    // User is not logged in, redirect to login page
    router.navigate(['/auth/login']);
    return false;
  }
};