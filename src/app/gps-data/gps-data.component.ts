import { Component, OnInit } from '@angular/core';

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
    private logService: LogService,
    private locationStatusService: LocationStatusService
  ) {
    this.logService.add('GPSDataComponent constructor');
  }

  ngOnInit() {
    this.locationStatusService.getLocationStatus().subscribe(s => this.status = s);
  }

}
