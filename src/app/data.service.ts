import { Injectable } from '@angular/core';

import * as localForage from 'localforage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { LatLong } from './lat-long';

@Injectable()
export class DataService {

  private static DEFAULT_ACCURACY = 3;

  BASE = 'base';
  TARGETS = 'targets';
  ACCURACY = 'accuracy';

  base: BehaviorSubject<LatLong>;
  baseObservable: Observable<LatLong>;

  targets: BehaviorSubject<Array<LatLong>>;
  targetsObservable: Observable<Array<LatLong>>;

  accuracy: BehaviorSubject<number>;
  accuracyObservable: Observable<number>;

  constructor() {
    this.base = new BehaviorSubject(undefined);
    this.baseObservable = this.base.asObservable();
    localForage.getItem<LatLong>(this.BASE).then(b => this.base.next(b));

    this.targets = new BehaviorSubject([]);
    this.targetsObservable = this.targets.asObservable();
    localForage.getItem<Array<LatLong>>(this.TARGETS).then(t => this.targets.next(t || []));

    this.accuracy = new BehaviorSubject(3);
    this.accuracyObservable = this.accuracy.asObservable();
    localForage.getItem<number>(this.ACCURACY).then(a => this.accuracy.next(a || DataService.DEFAULT_ACCURACY));
  }

  getBase(): Observable<LatLong> {
    return this.baseObservable;
  }

  get currentBase() {
    return this.base.getValue();
  }

  /**
   * @param coords location of the base, null to remove the base
   */
  setBase(coords: LatLong) {
    if (coords) {
      localForage.setItem(this.BASE, coords).then(b => this.base.next(b));
    } else {
      localForage.removeItem(this.BASE).then(() => this.base.next(null));
    }
  }

  getTargets() {
    return this.targetsObservable;
    // return localForage.getItem(this.TARGETS);
  }

  addTarget(coords: LatLong) {
    // TODO what should I return?
    return localForage
      .getItem(this.TARGETS)
      .then((t: Array<LatLong>) => {
        if (!t) {
          t = [];
        }
        t.push(coords);
        localForage.setItem(this.TARGETS, t).then(x => this.targets.next(x));  // TODO catch success/error and log it
      });
  }

  removeAllTargets() {
    localForage.removeItem(this.TARGETS).then(x => this.targets.next([]));
  }

  getAccuracy(): Observable<number> {
    return this.accuracyObservable;
  }

  get currentAccuracy() {
    return this.accuracy.getValue();
  }

  setAccuracy(value: number) {
    localForage.setItem(this.ACCURACY, value).then(a => this.accuracy.next(a));
  }

}
