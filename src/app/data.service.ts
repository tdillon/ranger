import { Injectable } from '@angular/core';

import * as localForage from "localforage";

@Injectable()
export class DataService {

  BASE = 'base';
  TARGETS = 'targets';

  constructor() { }

  getBase(): Promise<Coordinates> {
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
