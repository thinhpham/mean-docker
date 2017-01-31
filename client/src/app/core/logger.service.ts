import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  log(msg: any) {
    console.log(msg.toString());
  }

  error(msg: any) {
    console.error(msg.toString());
  }
}
