import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the token from local storage
  const token = localStorage.getItem('userToken');

  if (token) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('token', token)
    });
    return next(authReq);
  }
  
  // If no token, pass the original request
  return next(req);
};