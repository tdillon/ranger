import { Component, OnInit } from '@angular/core';

import { LocationService } from "../location.service";
import { TickService } from "../tick.service";

@Component({
  selector: 'app-gps-freshness',
  templateUrl: './gps-freshness.component.html',
  styleUrls: ['./gps-freshness.component.css']
})
export class GpsFreshnessComponent implements OnInit {

  lastMS: number = Date.now();
  secondsOld: number = -1;

  constructor(private locationService: LocationService, private tickService: TickService) { }

  ngOnInit() {
    this.loadLocation();
  }

  loadLocation() {
    this.tickService.getTicker().subscribe(() => this.calcFreshness(Date.now()));

    this.locationService.getLocation().subscribe(l => {
      if (!l) return;
      this.lastMS = l.timestamp;
      this.calcFreshness(l.timestamp);
    });
  }

  private calcFreshness(timestamp) {
    this.secondsOld = (timestamp - this.lastMS) / 1000;
  }

}
