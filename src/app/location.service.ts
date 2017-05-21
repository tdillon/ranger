import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LocationService {
subject: Subject<Position>;

        constructor() {
            this.subject = new Subject();

            if ("geolocation" in navigator) {
                console.log(new Date(),'geolocation is available');
                navigator.geolocation.watchPosition(
                    /*success*/
                    (position : Position) => {
                        this.subject.next(position)
                    },
                    /*error*/
                    positionError => {
                        console.log(new Date(),`error in watchPosition: (${positionError.code}) ${positionError.message}`);
                    },
                    /*options*/
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
