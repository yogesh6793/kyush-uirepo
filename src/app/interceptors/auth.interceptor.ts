import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');

    let modifiedReq = req;

    // Add Authorization header if token exists
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: token,
          ...(userId && { userId }) // Add userId header only if exists
        }
      });
    }

    return next.handle(modifiedReq);
  }
}
