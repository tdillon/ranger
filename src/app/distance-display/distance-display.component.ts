import { Component, OnInit } from '@angular/core';

import { Utilities } from "../utilities";
import { LocationService } from "../location.service";
import { DataService } from "../data.service";

@Component({
  selector: 'app-distance-display',
  templateUrl: './distance-display.component.html',
  styleUrls: ['./distance-display.component.css']
})
export class DistanceDisplayComponent implements OnInit {

  distance: number = null;

  constructor(
    private locationService: LocationService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe(p =>
      this.distance = Utilities.getDistance(this.dataService.currentBase, p.coords)
    );
  }

}
