import { Component, OnInit } from '@angular/core';

import { LatLong } from "../lat-long";
import { DataService } from "../data.service";

@Component({
  selector: 'app-plot-bar',
  templateUrl: './plot-bar.component.html',
  styleUrls: ['./plot-bar.component.css']
})
export class PlotBarComponent implements OnInit {

  //private targets: Array<LatLong>;
  // private targets: Array<{latitude:number,longitude:number,distance?:number}>;
  targets: Array<LatLong | { distance: number }>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getTargets().subscribe(t => {
      this.targets = t.map(target => {
        return { ...target, distance: this.getDistance(target, this.dataService.currentBase) }
      });
    });
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
    return Math.round(D);  //YARDS
  }

}
