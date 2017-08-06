import { Component, OnInit } from '@angular/core';

import { LatLong } from '../lat-long';
import { LocationService } from '../location.service';
import { DataService } from '../data.service';
import { TickService } from '../tick.service';
import { LogService } from '../log.service';
import { Utilities } from '../utilities';

@Component({
  selector: 'app-target-adder',
  templateUrl: './target-adder.component.html',
  styleUrls: ['./target-adder.component.css']
})
export class TargetAdderComponent implements OnInit {

  distance: number;
  accuracy: number;
  bestAccuracy: number;
  lastMS: number = Date.now();
  secondsOld: number = Number.MAX_SAFE_INTEGER;

  constructor(
    private locationService: LocationService,
    private dataService: DataService,
    private tickService: TickService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  addTarget() {
    this.dataService.addTarget(new LatLong(this.locationService.currentLocation.coords));
  }

  getLocation() {
    this.locationService.getLocation().subscribe(l => {
      this.updateDistance(l, this.dataService.currentBase);
      this.accuracy = l.coords.accuracy;
      this.lastMS = l.timestamp;
      this.calcFreshness(l.timestamp);
    });

    this.dataService.getAccuracy().subscribe(a => {
      this.logService.info(`TargetAdderComponent new accuracy: ${a}`);
      this.bestAccuracy = a;
    });

    this.dataService.getBase().subscribe(l => this.updateDistance(this.locationService.currentLocation, l));

    this.tickService.getTicker().subscribe(() => this.calcFreshness(Date.now()));
  }

  /**
   * Get the distance between TODO
   */
  private updateDistance(l?: Position, base?: LatLong) {
    this.distance = (l && base) ? Utilities.getDistance({
      latitude: l.coords.latitude,
      longitude: l.coords.longitude
    }, base) : -1;
  }

  private calcFreshness(timestamp) {
    this.secondsOld = (timestamp - this.lastMS) / 1000;
  }

}
