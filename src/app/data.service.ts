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
  baseObservable: Observable<LatLong>;

  targets: BehaviorSubject<Array<LatLong>>;
  targetsObservable: Observable<Array<LatLong>>;

  constructor() {
    this.base = new BehaviorSubject(undefined);
    this.baseObservable = this.base.asObservable();
    localForage.getItem<LatLong>(this.BASE).then(b => this.base.next(b));

    this.targets = new BehaviorSubject([]);
    this.targetsObservable = this.targets.asObservable();
    localForage.getItem<Array<LatLong>>(this.TARGETS).then(t => this.targets.next(t || []));
  }

  getBase(): Observable<LatLong> {
     return this.baseObservable;
  }

  get currentBase() {
    return this.base.getValue();
  }

  setBase(coords:LatLong) {
    if (coords) {
      localForage.setItem(this.BASE, coords).then(b => this.base.next(b));
    } else {
      localForage.removeItem(this.BASE).then(() => this.base.next(null));
    }
  }

  getTargets() {
    return this.targetsObservable;
    //return localForage.getItem(this.TARGETS);
  }

  addTarget(coords: LatLong) {
    console.log('addTarget', coords)
    //TODO what should I return?
    return localForage
      .getItem(this.TARGETS)
      .then((t:Array<LatLong>) => {
        if (!t) {
          t = [];
        }
        t.push(coords);
        localForage.setItem(this.TARGETS, t).then(x => this.targets.next(x));  //TODO catch success/error and log it
      }
    );
  }

}
