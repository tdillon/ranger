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
    private LocationService: LocationService
  ) {
    this.logService.add('GPSDataComponent constructor');
  }

  ngOnInit() {
    this.LocationService.getLocationStatus().subscribe(s => this.status = s);
  }

}
