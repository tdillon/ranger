import { Component, OnInit } from '@angular/core';

import { LatLong } from "../lat-long";
import { LocationService } from "../location.service";
import { DataService } from "../data.service";

@Component({
  selector: 'app-target-adder',
  templateUrl: './target-adder.component.html',
  styleUrls: ['./target-adder.component.css']
})
export class TargetAdderComponent implements OnInit {

  distance: number;

  constructor(private locationService: LocationService, private dataService: DataService) { }

  ngOnInit() {
    this.getLocation();
  }

  addTarget() {
    this.dataService.addTarget(new LatLong(this.locationService.currentLocation.coords));
  }

  getLocation() {
    this.locationService.getLocation().subscribe(l => this.updateDistance(l, this.dataService.currentBase));
    this.dataService.getBase().subscribe(l => this.updateDistance(this.locationService.currentLocation, l));
  }

  /**
   * Get the distance between TODO
   */
  private updateDistance(l?: Position, base ?: LatLong) {
      this.distance = (l && base) ? this.getDistance({
        latitude: l.coords.latitude,
        longitude: l.coords.longitude
      }, base) : -1;
  }

  private getDistance(l1: LatLong, l2: LatLong) {
    //http://en.wikipedia.org/wiki/Geographical_distance#Tunnel_distance
    //radians are needed for calculations
    const lat1 = l1.latitude * Math.PI / 180,
          lon1 = l1.longitude * Math.PI / 180,
          lat2 = l2.latitude * Math.PI / 180,
          lon2 = l2.longitude * Math.PI / 180,
          R = 6371.009,  //earth's radius in KM
          X = Math.cos(lat2) * Math.cos(lon2) - Math.cos(lat1) * Math.cos(lon1),
          Y = Math.cos(lat2) * Math.sin(lon2) - Math.cos(lat1) * Math.sin(lon1),
          Z = Math.sin(lat2) - Math.sin(lat1),
          C = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2) + Math.pow(Z, 2)),
          D = R /*KM*/ * C * 1000 /*M/KM*/ / .9144 /*M/Y*/;
    return D;  //YARDS
  }

}
