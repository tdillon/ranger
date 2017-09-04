import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { LogService } from './log.service';

@Injectable()
export class LocationService {
    location: BehaviorSubject<Position>;
    locationObservable: Observable<Position>;

    status: BehaviorSubject<boolean>;
    statusObservable: Observable<boolean>;

    watchID: number = null;

    constructor(private logService: LogService) {
        this.location = new BehaviorSubject(undefined);
        this.locationObservable = this.location.asObservable().filter(l => !!l);

        this.status = new BehaviorSubject(false);
        this.statusObservable = this.status.asObservable();

        // TODO: get whether gps is on/off from data service
        //this.turnOn();
    }

    private get hasGeoLocation(): boolean {
        return 'geolocation' in navigator;
    }

    /**
     * Returns true if the app attempts to use GPS, false otherwise.
     */
    public getLocationStatus() {
        return this.statusObservable;
    }

    public getLocation() {
        return this.locationObservable;
    }

    public get currentLocation() {
        return this.location.getValue();
    }

    /**
     * Turns the GPS on (true) or off (false).
     * @param status true to turn on the GPS, false to turn it off.
     */
    public setGPS(status: boolean) {
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

        this.status.next(true);

        if (this.hasGeoLocation) {
            this.logService.info('LocationService: turnOn: geolocation is available');

            this.watchID = navigator.geolocation.watchPosition(
                p => this.location.next(p),
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

        this.status.next(false);

        if (this.hasGeoLocation) {
            navigator.geolocation.clearWatch(this.watchID);
            this.watchID = null;
        }
    }

}
