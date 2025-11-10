import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  // Show loader before request
  loaderService.show();

  return next(req).pipe(
    // Hide loader after request is complete (or errors)
    finalize(() => loaderService.hide())
  );
};