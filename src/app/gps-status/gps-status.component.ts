import { Component, OnInit } from '@angular/core';

import { LocationService, LocationStatusData } from '../location.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-gps-status',
  templateUrl: './gps-status.component.html',
  styleUrls: ['./gps-status.component.css']
})
export class GpsStatusComponent implements OnInit {

  status: LocationStatusData;
  on: boolean;

  constructor(
    private logService: LogService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.getLocationStatus().subscribe(s => this.status = s);
    this.locationService.getGPSState().subscribe(s => this.on = s);
  }

}
