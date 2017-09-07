import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { LocationService, LocationStatusData } from '../location.service';
import { LatLong } from '../lat-long';

@Component({
  selector: 'app-base-setter',
  templateUrl: './base-setter.component.html',
  styleUrls: ['./base-setter.component.css']
})
export class BaseSetterComponent implements OnInit {

  locationStatus: LocationStatusData;
  base: LatLong;
  showDelete = false;

  constructor(
    private dataService: DataService,
    private LocationService: LocationService
  ) { }

  ngOnInit() {
    this.dataService.getBase().subscribe(b => this.base = b);
    this.LocationService.getLocationStatus().subscribe(s => {
      this.locationStatus = s;
    });
  }

  setBase(removeBase: boolean) {
    const c = this.locationStatus.position.coords;
    this.dataService.setBase(removeBase ? null : { latitude: c.latitude, longitude: c.longitude });
  }

}
