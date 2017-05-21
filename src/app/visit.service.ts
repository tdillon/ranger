import { Injectable } from '@angular/core';

import * as localForage from "localforage";

@Injectable()
export class VisitService {

  KEY = 'foo';

  getString(): Promise<Array<String>> {
    return localForage.getItem(this.KEY);
  }

  add(s: String): void {
    localForage
      .getItem(this.KEY)
      .then((v: Array<String>) => {
        v.push(s);
        localForage.setItem(this.KEY, v);
      });
  }

}
