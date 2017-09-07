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
    private LocationService: LocationService
  ) { }

  ngOnInit() {
    this.LocationService.getLocationStatus().subscribe(s => this.status = s);
    this.LocationService.getGPSState().subscribe(s => this.on = s);
  }

}
