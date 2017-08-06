import { Component, OnInit } from '@angular/core';

import { LocationService } from '../location.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-gps-data',
  templateUrl: './gps-data.component.html',
  styleUrls: ['./gps-data.component.css']
})
export class GPSDataComponent implements OnInit {

  location: Position;

  constructor(
    private locationService: LocationService,
    private logService: LogService
  ) {
    this.logService.add('GPSDataComponent constructor');
  }

  ngOnInit() {
    this.locationService.getLocation().subscribe(l => this.location = l);
  }

}
