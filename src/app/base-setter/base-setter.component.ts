import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { LocationService, LocationStatusData } from '../location.service';
import { LatLong } from '../lat-long';
import { LogService } from '../log.service';

@Component({
  selector: 'app-base-setter',
  templateUrl: './base-setter.component.html',
  styleUrls: ['./base-setter.component.css']
})
export class BaseSetterComponent implements OnInit {

  locationStatus: LocationStatusData;
  base: LatLong;
  showDelete = false;

  constructor(
    private dataService: DataService,
    private LocationService: LocationService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.dataService.getBase().subscribe(b => this.base = b);
    this.LocationService.getLocationStatus().subscribe(s => {
      this.locationStatus = s;
    });
  }

  setBase(removeBase = false) {
    if (removeBase) {
      this.logService.info('BaseSetterComponent: setBase: Removing base.');
      this.dataService.setBase(null);
    } else {
      this.logService.info('BaseSetterComponent: setBase: Setting base.');

      if (!(this.locationStatus && this.locationStatus.position && this.locationStatus.position.coords)) {
        this.logService.error('BaseSetterComponent: setBase: No location.');
      } else {
        const c = this.locationStatus.position.coords;
        this.dataService.setBase(removeBase ? null : { latitude: c.latitude, longitude: c.longitude });
      }
    }
  }

}
