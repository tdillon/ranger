import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Injectable()
export class TickService {

  private ticker: Observable<number>;

  constructor() {
    this.ticker = Observable.timer(0, 1000);
  }

  getTicker() {
    return this.ticker;
  }

}
