import { Component, OnInit } from '@angular/core';

import { LogService } from '../log.service';
import { LocationService, LocationStatusData } from '../location.service';

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
    private locationService: LocationService
  ) {
    this.logService.add('GPSDataComponent constructor');
  }

  ngOnInit() {
    this.locationService.getLocationStatus().subscribe(s => this.status = s);
  }

}
