import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LocationService {
    subject: BehaviorSubject<Position>;

    constructor() {
        this.subject = new BehaviorSubject(undefined);

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
        return this.subject;
    }

}
