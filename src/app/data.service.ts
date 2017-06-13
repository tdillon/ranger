import { Injectable } from '@angular/core';

import * as localForage from "localforage";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

import { LatLong } from './lat-long'

@Injectable()
export class DataService {

  BASE = 'base';
  TARGETS = 'targets';

  base: BehaviorSubject<LatLong>;

  constructor() {
    this.base = new BehaviorSubject(undefined);
    localForage.getItem<LatLong>(this.BASE).then(b => this.base.next(b));
  }

  getBase(): BehaviorSubject<LatLong> {
     return this.base;
  }

  setBase(coords:LatLong) {
    localForage.setItem(this.BASE, coords).then(b => this.base.next(b));
  }

  getTargets(): Promise<Array<LatLong>> {
    return localForage.getItem(this.TARGETS);
  }

  addTarget(coords: LatLong): Promise<Array<LatLong>> {
    return this.getTargets().then(t => {
      t.push(coords);
      return localForage.setItem(this.TARGETS, t);
    });
  }

}
