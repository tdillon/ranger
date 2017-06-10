import { Injectable } from '@angular/core';

import * as localForage from "localforage";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class DataService {

  BASE = 'base';
  TARGETS = 'targets';

  base: BehaviorSubject<Coordinates>;

  constructor() {
    this.base = new BehaviorSubject(undefined);
  }

  getBase(): Promise<Coordinates> {
    // this.base.next()
    return localForage.getItem(this.BASE);
  }

  getTargets(): Promise<Array<Coordinates>> {
    return localForage.getItem(this.TARGETS);
  }

  setBase(coords: Coordinates): Promise<Coordinates> {
    return localForage.setItem(this.BASE, coords);
  }

  addTarget(coords: Coordinates): Promise<Array<Coordinates>> {
    return this.getTargets().then(t => {
      t.push(coords);
      return localForage.setItem(this.TARGETS, t);
    });
  }

}
