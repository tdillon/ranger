import { Component, OnInit } from '@angular/core';

import { LatLong } from '../lat-long';
import { DataService } from '../data.service';
import { LogService } from '../log.service';
import { LocationStatusData, LocationService } from '../location.service';

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
    private LocationService: LocationService,
    private dataService: DataService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  addTarget() {
    this.dataService.addTarget(new LatLong(this.status.position.coords));
  }

  getLocation() {
    this.LocationService.getLocationStatus().subscribe(l => this.status = l);
  }

}
