import { Component, OnInit, HostListener, HostBinding } from '@angular/core';

import { LocationService, LocationStatusData } from '../location.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-gps-toggler',
  templateUrl: './gps-toggler.component.html',
  styleUrls: ['./gps-toggler.component.css']
})
export class GpsTogglerComponent implements OnInit {

  @HostBinding('class.gpsOn') on: boolean;
  status: LocationStatusData;

  constructor(
    private logService: LogService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.getGPSState().subscribe(s => {
      this.logService.info(`GPSTogglerComponent: ngOnInit: GPS status changed: ${s}`);
      this.on = s;
    });

    this.locationService.getLocationStatus().subscribe(s => this.status = s);
  }

  @HostListener('click') onChange() {
    this.logService.info(`GPSTogglerComponent: onChange: Setting GPS: ${!this.on}`);
    this.locationService.setGPS(!this.on);
  }

}
