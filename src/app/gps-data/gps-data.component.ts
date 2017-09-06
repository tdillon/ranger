import { Component, OnInit } from '@angular/core';

import { LocationService } from '../location.service';
import { LogService } from '../log.service';
import { LocationStatusService, LocationStatusData } from '../location-status.service';

@Component({
  selector: 'app-gps-data',
  templateUrl: './gps-data.component.html',
  styleUrls: ['./gps-data.component.css']
})
export class GPSDataComponent implements OnInit {

  location: Position;
  status: LocationStatusData;

  constructor(
    private locationService: LocationService,
    private logService: LogService,
    private locationStatusService: LocationStatusService
  ) {
    this.logService.add('GPSDataComponent constructor');
  }

  ngOnInit() {
    this.locationService.getLocation().subscribe(l => this.location = l);
    this.locationStatusService.getLocationStatus().subscribe(s => this.status = s);
  }

}
