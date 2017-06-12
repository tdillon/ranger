import { Component, OnInit } from '@angular/core';

import { LocationService } from "../location.service";

@Component({
  selector: 'app-gps-freshness',
  templateUrl: './gps-freshness.component.html',
  styleUrls: ['./gps-freshness.component.css']
})
export class GpsFreshnessComponent implements OnInit {

  lastMS: number = Date.now();
  secondsOld: number = 0;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadLocation();
  }

  loadLocation() {
    this.locationService.getLocation().subscribe(l => {
      if (!l) return;
      this.secondsOld = (l.timestamp - this.lastMS) / 1000;
      this.lastMS = l.timestamp;
    });
  }

}
