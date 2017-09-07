import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/timer';

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

  private watchID: number = null;
  private base: LatLong;
  private statusSubject: BehaviorSubject<LocationStatusData>;
  /** Is GPS off (false) or on (true). */
  private gpsState: BehaviorSubject<boolean>;
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
    private logService: LogService,
    private dataService: DataService
  ) {
    this.gpsState = new BehaviorSubject(false);
    this.statusSubject = new BehaviorSubject(this.status);

    this.dataService.getAccuracy().subscribe(a => {
      this.status.maa = a;
      this.updateInfo();
    });

    this.dataService.getBase().subscribe(b => {
      this.base = b;
      this.updateInfo();
    });
  }

  private get hasGeoLocation(): boolean {
    return 'geolocation' in navigator;
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
  public getGPSState() {
    return this.gpsState.asObservable();
  }

  /**
   * Returns true if the app attempts to use GPS, false otherwise.
   */
  public getLocationStatus() {
    return this.statusSubject.asObservable();
  }

  public get currentLocationStatus() {
    return this.statusSubject.getValue();
  }

  /**
   * Turns the GPS on (true) or off (false).
   * @param status true to turn on the GPS, false to turn it off.
   */
  public setGPS(status: boolean) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (status) {
      this.sub = Observable.timer(1100, 1000).subscribe(() => this.updateInfo());
    }

    if (status && this.watchID !== null) {
      this.logService.warn(`LocationService: setGPS: GPS already on.`);
    } else if (status) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  private turnOn() {
    this.logService.info(`LocationService: turnOn: Turning on GPS.`);

    this.gpsState.next(true);

    if (this.hasGeoLocation) {
      this.logService.info('LocationService: turnOn: geolocation is available');

      this.watchID = navigator.geolocation.watchPosition(
        p => {
          if (this.sub) {
            this.sub.unsubscribe();
          }
          this.status.position = p;
          this.updateInfo();
          this.sub = Observable.timer(1100, 1000).subscribe(() => this.updateInfo());
        },
        p => {
          this.logService.error(`LocationService: watchPosition: (${p.code}) ${p.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,  /* 20 seconds */
          maximumAge: 5000  /* 5 seconds */
        }
      );

      this.logService.info(`LocationService: turnOn: GPS turned on.  ID: ${this.watchID}.`);
    } else {
      this.logService.error('LocationService: turnOn: geolocation IS NOT available');
    }
  }

  private turnOff() {
    this.logService.info(`LocationService: turnOff: Turning off GPS.  ID: ${this.watchID}`);

    this.gpsState.next(false);

    if (this.hasGeoLocation) {
      navigator.geolocation.clearWatch(this.watchID);
      this.watchID = null;
    }
  }


}
