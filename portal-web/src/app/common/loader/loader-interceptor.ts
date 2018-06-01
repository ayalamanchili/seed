import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("loading....");
        this.loaderService.show();
        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                console.log(error);
                return Observable.throw(error);
            }),
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }

}
