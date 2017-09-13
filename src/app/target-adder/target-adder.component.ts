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
  public gpsOn = false;

  constructor(
    private locationService: LocationService,
    private dataService: DataService,
    private logService: LogService
  ) { }

  ngOnInit() {
    this.locationService.getLocationStatus().subscribe(l => this.status = l);
    this.locationService.getGPSState().subscribe(s => this.gpsOn = s);
  }

  addTarget() {
    this.dataService.addTarget(new LatLong(this.status.position.coords));
  }

}
