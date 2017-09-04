import { Component, OnInit } from '@angular/core';

import { LocationService } from '../location.service';
import { LocationStatusService, LocationStatusData } from "../location-status.service";
import { LogService } from '../log.service';

@Component({
  selector: 'app-gps-toggler',
  templateUrl: './gps-toggler.component.html',
  styleUrls: ['./gps-toggler.component.css']
})
export class GpsTogglerComponent implements OnInit {

  on: boolean;
  status: LocationStatusData;
  
  constructor(
    private locationService: LocationService,
    private logService: LogService,
    private locationStatusService: LocationStatusService
  ) { }

  ngOnInit() {
    this.locationService.getLocationStatus().subscribe(s => {
      this.logService.info(`GPSTogglerComponent: ngOnInit: GPS status changed: ${s}`);
      this.on = s;
    });

    this.locationStatusService.getStatus().subscribe(s => this.status = s);

  }

  onChange(status:boolean) {
    this.logService.info(`GPSTogglerComponent: onChange: Setting GPS: ${status}`);
    this.locationService.setGPS(status);
  }

}
