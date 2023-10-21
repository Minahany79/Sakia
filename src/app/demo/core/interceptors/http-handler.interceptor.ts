import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { MessageService } from 'primeng/api';
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {
    constructor(public messageService: MessageService,) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (request.body! instanceof FormData) {
        //     request = request.clone({
        //         setHeaders: {
        //             'Content-Type': 'application/json',
        //         },
        //     });
        // }
        return next.handle(request).pipe(tap(evt => {
            if (evt instanceof HttpResponse) {
                if (evt.body && evt.body.success)
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: evt.body.message, life: 3000 });
            }
        }), catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.error instanceof ErrorEvent) {
                    console.log('this is client side error');
                    console.log(`Error: ${err.error.message}`)
                }
                try {
                    this.messageService.add({ severity: 'error', summary: 'Faield!', detail: err.error.message, life: 3000 });
                } catch (e) {
                    this.messageService.add({ severity: 'error', summary: 'Faield!', detail: 'An error occurred!', life: 3000 });
                }
                console.log(err)
            }
            return of(err);
        }))

    }
}
