import { Component, OnInit } from '@angular/core';

import { LatLong } from '../lat-long';
import { DataService } from '../data.service';
import { LogService } from '../log.service';
import { LocationStatusData, LocationStatusService } from '../location-status.service';

@Component({
  selector: 'app-target-adder',
  templateUrl: './target-adder.component.html',
  styleUrls: ['./target-adder.component.css']
})
export class TargetAdderComponent implements OnInit {

  public status: LocationStatusData;
  distance: number;
  accuracy: number;
  bestAccuracy: number;
  lastMS: number = Date.now();
  secondsOld: number = Number.MAX_SAFE_INTEGER;

  constructor(
    private locationStatusService: LocationStatusService,
    private dataService: DataService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  addTarget() {
    // TODO
    // this.dataService.addTarget(new LatLong(this.locationService.currentLocation.coords));
  }

  getLocation() {
    this.locationStatusService.getLocationStatus().subscribe(l => this.status = l);
  }

}
