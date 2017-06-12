import { Component, OnInit } from '@angular/core';

import { LocationService } from "../location.service";

@Component({
  selector: 'app-gps-accuracy',
  templateUrl: './gps-accuracy.component.html',
  styleUrls: ['./gps-accuracy.component.css']
})
export class GpsAccuracyComponent implements OnInit {

  accuracy:number;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.locationService.getLocation().subscribe(l => {
      if (!l) return;
      this.accuracy = l.coords.accuracy
    });
  }

}
