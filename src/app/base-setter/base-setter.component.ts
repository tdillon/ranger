import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { LocationService } from '../location.service';
import { LatLong } from '../lat-long';

@Component({
  selector: 'app-base-setter',
  templateUrl: './base-setter.component.html',
  styleUrls: ['./base-setter.component.css']
})
export class BaseSetterComponent implements OnInit {

  base: LatLong;
  showDelete = false;

  constructor(private dataService: DataService, private locationService: LocationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getBase().subscribe(b => this.base = b);
  }

  setBase(removeBase: boolean) {
    const c = this.locationService.currentLocation.coords;
    this.dataService.setBase(removeBase ? null : { latitude: c.latitude, longitude: c.longitude });
  }

}
