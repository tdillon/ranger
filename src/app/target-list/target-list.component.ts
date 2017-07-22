import { Component, OnInit } from '@angular/core';

import { Utilities } from "../utilities";
import { LatLong } from "../lat-long";
import { LogService } from "../log.service";
import { DataService } from "../data.service";
import { LocationService } from "../location.service";

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

  targets: Array<LatLong & { distanceToBase: number, distanceToCurrent: number }> = [];

  constructor(
    private dataService: DataService,
    private locationService: LocationService,
    private logService: LogService
  ) {
    this.logService.info('TargetListComponent constructor');
  }

  ngOnInit() {
    this.locationService.getLocation().subscribe(l => {
      this.targets.forEach(t =>
        t.distanceToCurrent = Utilities.getDistance(t, new LatLong(l.coords))
      )
    });

    this.dataService.getBase().subscribe(b => {
      this.targets.forEach(t =>
        t.distanceToBase = Utilities.getDistance(t, b)
      )
    });

    this.dataService.getTargets().subscribe(t => {
      console.log('this should only hit once, right?');
      this.targets = t.map(t => {
        return {
          ...t,
          distanceToBase: Utilities.getDistance(t, this.dataService.currentBase),
          distanceToCurrent: Utilities.getDistance(t, new LatLong(this.locationService.currentLocation.coords))
        }
      });
    });
  }

}
