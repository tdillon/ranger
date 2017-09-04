import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/timer';

import { LocationService } from './location.service';
import { LogService } from './log.service';
import { DataService } from './data.service';
import { Utilities } from './utilities';
import { LatLong } from './lat-long';

export interface LocationStatusData {
  /** Last position data returned from GPS, or null. */
  position: Position;

  /** Seconds Since Last Fix */
  sslf: number;
  /** true if sslf < 1, false otherwise */
  isFresh: boolean;

  /** Minimum Acceptable Accuracy - user set */
  maa: number;
  /** The actual accuracy of the GPS data. */
  accuracy: number;
  /** true if accuracy <= maa, false otherwise */
  isAccurate: boolean;

  /** Distance From Base, null if base is not set or no position data */
  dfb: number;
  /** true if dfb >= 1000, false otherwise */
  isOutOfBounds: boolean;

}

@Injectable()
export class LocationStatusService {

  private base: LatLong;
  private statusSubject: BehaviorSubject<LocationStatusData>;
  private sub: Subscription;
  private status: LocationStatusData = {
    position: null,
    sslf: null,
    isFresh: false,
    maa: null,
    accuracy: null,
    isAccurate: false,
    dfb: null,
    isOutOfBounds: true
  };

  constructor(
    private locationService: LocationService,
    private logService: LogService,
    private dataService: DataService
  ) {
    this.statusSubject = new BehaviorSubject(this.status);

    this.locationService.getLocation().subscribe(p => {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.status.position = p;
      this.updateInfo();
      this.sub = Observable.timer(1100, 1000).subscribe(() => this.updateInfo());
    });

    this.dataService.getAccuracy().subscribe(a => {
      this.status.maa = a;
      this.updateInfo();
    });

    this.dataService.getBase().subscribe(b => {
      this.base = b;
      this.updateInfo();
    });

    this.locationService.getLocationStatus().subscribe(s => {
      if (this.sub) {
        this.sub.unsubscribe();
      }

      if (s) {
        this.sub = Observable.timer(1100, 1000).subscribe(() => this.updateInfo());
      }
    });
  }

  private updateInfo() {
    this.status.sslf = this.status.position ? (Date.now() - this.status.position.timestamp) / 1000 : null;
    this.status.isFresh = this.status.sslf < 1;

    this.status.accuracy = this.status.position ? this.status.position.coords.accuracy : null;
    this.status.isAccurate = this.status.accuracy <= this.status.maa;

    this.status.dfb = this.status.position ? Utilities.getDistance(this.base, this.status.position.coords) : null;
    this.status.isOutOfBounds = this.status.dfb >= 1000;

    this.statusSubject.next(this.status);
  }

  /**
   * While GPS is on, emits a LocationStatusData object approximately every second.
   */
  getStatus() {
    return this.statusSubject.asObservable();
  }

}
