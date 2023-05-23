import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  finalize,
  lastValueFrom,
  Observable,
  throwError,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '@app/services/spinner.service';

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {
  private counter = 0;
  private queue: HttpErrorResponse[] = [];

  constructor(
    private spinnerService: SpinnerService,
    private notifier: MatSnackBar
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let spinnerOn = false;
    this.spinnerService.show();
    this.counter++;
    spinnerOn = true;
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        this.notify(response);
        return throwError(() => response);
      }),
      finalize(() => {
        if (spinnerOn) this.counter--;
        if (this.counter === 0) this.spinnerService.hide();
      })
    );
  }

  async notify(response: HttpErrorResponse) {
    this.queue.push(response);
    if (this.queue.length > 1) return;
    while (this.queue.length !== 0) {
      let separator = ' - ';
      let message = response.status + separator + response.statusText;
      let error = response.error;
      if (
        error != null &&
        !(error instanceof ProgressEvent) &&
        error.title != null
      )
        message = error.title + '\n ' + error.traceId;
      await lastValueFrom(
        this.notifier
          .open(message, 'Dismiss', { duration: 3000 })
          .afterDismissed()
      );
      this.queue.shift();
    }
  }
}
