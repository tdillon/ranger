import { Component, OnInit } from '@angular/core';

import { LocationService } from "../location.service";
import { LogService } from "../log.service";

@Component({
  selector: 'app-gps-toggler',
  templateUrl: './gps-toggler.component.html',
  styleUrls: ['./gps-toggler.component.css']
})
export class GpsTogglerComponent implements OnInit {

  on:boolean;

  constructor(
    private locationService:LocationService,
    private logService:LogService
  ) { }

  ngOnInit() {
    this.locationService.getLocationStatus().subscribe(s => {
      this.logService.info(`GPSTogglerComponent: ngOnInit: GPS status changed: ${s}`);
      this.on = s;
    }    );
  }

  onChange() {
    this.logService.info(`GPSTogglerComponent: onChange: Setting GPS: ${this.on}`);
    this.locationService.setGPS(this.on);
  }

}
