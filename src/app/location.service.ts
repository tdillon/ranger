import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter'

@Injectable()
export class LocationService {
    subject: BehaviorSubject<Position>;
    observable: Observable<Position>;

    constructor() {
        this.subject = new BehaviorSubject(undefined);
        this.observable = this.subject.asObservable().filter(l => !!l);

        if ("geolocation" in navigator) {
            console.log(new Date(), 'geolocation is available');
            navigator.geolocation.watchPosition(
                p => { this.subject.next(p); },
                p => { console.log(new Date(), `error in watchPosition: (${p.code}) ${p.message}`) },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,  /* 20 seconds */
                    maximumAge: 5000  /* 5 seconds */
                }
            );
        } else {
            console.log(new Date(), 'geolocation IS NOT available');
        }

    }

    getLocation() {
        return this.observable;
    }

    get currentLocation() {
        return this.subject.getValue();
    }

}
