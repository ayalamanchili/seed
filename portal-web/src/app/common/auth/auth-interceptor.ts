import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const authHeader = localStorage.getItem('token');
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
}
