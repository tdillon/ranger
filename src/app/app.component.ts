import { Component } from '@angular/core';

import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ranger';
  position:Position;
  count = 0;

  constructor(private locationService: LocationService) {
    this.locationService.getLocation().subscribe(p => { ++this.count; this.position = p; });
   }

   getTime() {
     return new Date(this.position.timestamp);
   }

   getString(s) {
     console.log("getString", s);
     return JSON.stringify(s);
   }
}
