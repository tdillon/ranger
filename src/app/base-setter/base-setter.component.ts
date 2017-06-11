import { Component, OnInit } from '@angular/core';

import { DataService } from "../data.service";
import { LocationService } from "../location.service";
import { LatLong } from "../lat-long";

@Component({
  selector: 'app-base-setter',
  templateUrl: './base-setter.component.html',
  styleUrls: ['./base-setter.component.css']
})
export class BaseSetterComponent implements OnInit {

  base :LatLong;

  constructor(private dataService: DataService, private locationService :LocationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getBase().subscribe(b => this.base = b);
  }

  setBase() {
    let c = this.locationService.getLocation().getValue().coords;
    this.dataService.setBase({latitude: c.latitude, longitude: c.longitude});
  }

}
