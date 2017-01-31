import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface SpinnerState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  spinnerState = this.spinnerSubject.asObservable();

  private spinnerSubject = new Subject<SpinnerState>();

  constructor() { }

  show() {
    this.spinnerSubject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.spinnerSubject.next(<SpinnerState>{ show: false });
  }
}