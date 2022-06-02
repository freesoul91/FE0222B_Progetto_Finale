import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterInterceptor implements HttpInterceptor {
  token: string;
  tenant: string;

  constructor() {
    this.token = environment.adminToken;
    this.tenant = environment.adminTenant;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let ok: string;
    let authReq: HttpRequest<any> = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + this.token)
        .set('X-TENANT-ID', this.tenant),
    });

    return next.handle(authReq).pipe(
      tap((event) => {
        ok = event instanceof HttpResponse ? 'succeeded' : '';
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('error'));
      })
    );
  }
}
