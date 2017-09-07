import { Component, OnInit } from '@angular/core';

import { Utilities } from '../utilities';
import { LatLong } from '../lat-long';
import { LogService } from '../log.service';
import { DataService } from '../data.service';
import { LocationService, LocationStatusData } from '../location.service';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

  targets: Array<LatLong & { distanceToBase: number, distanceToCurrent: number }> = [];
  private status: LocationStatusData;

  constructor(
    private dataService: DataService,
    private LocationService: LocationService,
    private logService: LogService
  ) {
    this.logService.info('TargetListComponent constructor');
  }

  ngOnInit() {
    this.LocationService.getLocationStatus().subscribe(s => {
      this.status = s;
      console.log('getLocationStatus', this.status);
      this.targets.forEach(t =>
        t.distanceToCurrent = Utilities.getDistance(t, new LatLong(s.position.coords))
      );
    });

    this.dataService.getBase().subscribe(b => {
      this.targets.forEach(t =>
        t.distanceToBase = Utilities.getDistance(t, b)
      );
    });

    this.dataService.getTargets().subscribe(targets => {
      console.log('getTarget', this.status);
      this.targets = targets.map(t => {
        return {
          ...t,
          distanceToBase: Utilities.getDistance(t, this.dataService.currentBase),
          distanceToCurrent: this.status.position ? Utilities.getDistance(t, new LatLong(this.status.position.coords)) : null
        };
      });
    });
  }

}
