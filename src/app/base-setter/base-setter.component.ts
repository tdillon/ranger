import { Component, OnInit } from '@angular/core';

import { DataService } from "../data.service";
import { LocationService } from "../location.service";

@Component({
  selector: 'app-base-setter',
  templateUrl: './base-setter.component.html',
  styleUrls: ['./base-setter.component.css']
})
export class BaseSetterComponent implements OnInit {

  base :Coordinates;

  constructor(private dataService: DataService, private locationService :LocationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getBase().then(b => this.base = b);
  }

  setBase() {
    this.dataService.setBase(this.locationService.getLocation().getValue().coords);
  }

}
