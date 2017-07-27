import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { LatLong } from "../lat-long";
import { DataService } from "../data.service";
import { LocationService } from "../location.service";

@Component({
  selector: 'app-plot-bar',
  templateUrl: './plot-bar.component.html',
  styleUrls: ['./plot-bar.component.css']
})
export class PlotBarComponent implements AfterViewInit {

  targets: Array<LatLong & { distance: number }>;

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D;

  constructor(private dataService: DataService, private locationService: LocationService) { }

  ngAfterViewInit() {
    let clientWidth = document.documentElement.clientWidth;
    let devicePixelRatio = window.devicePixelRatio;
    let width = (clientWidth - 32) * devicePixelRatio;  //TODO figure out padding/spacing
    let height = 100;

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

     this.canvas.width = width;
     this.canvas.height = height * devicePixelRatio;

     this.canvas.style.width = `${clientWidth - 32}px`
     this.canvas.style.height = `${height}px`;

    this.getData();
  }

  getData() {
    this.locationService.getLocation().subscribe(l => {
      //this.draw();
    });

    this.dataService.getTargets().subscribe(t => {
      this.targets = t.map(target => {
        return { ...target, distance: this.getDistance(target, this.dataService.currentBase) }
      });

      this.draw();
    });
  }

  private draw() {
    if (this.targets.length == 0) return;

    let currentLocation;
    let currentDistance;

    let max:number = this.targets.reduce((a, b, c, d) => {
      return (a > b.distance ? a : b.distance);
    },  0);

    if (this.locationService.currentLocation) {
      currentLocation = this.locationService.currentLocation;
      currentDistance = this.getDistance(new LatLong(currentLocation.coords), this.dataService.currentBase);
    }

    if (currentDistance > max) {
      max = currentDistance ;
    }

    max = Math.min(max, 1000);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    //Main bar
    this.ctx.strokeStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.moveTo(0, Math.floor(this.canvas.height / 2) + .5);
    this.ctx.lineTo(this.canvas.width, Math.floor(this.canvas.height / 2) + .5);
    this.ctx.stroke();

    const w = this.canvas.width;
    const wr = w / max;

    //Draw distance markers and text
    this.ctx.fillStyle = 'pink';
    for (let i = 1; i <= Math.floor(max / 25); ++i) {
      this.ctx.moveTo(Math.floor(wr * i * 25) + .5, this.canvas.height / 2 - 25);
      this.ctx.lineTo(Math.floor(wr * i * 25) + .5, this.canvas.height / 2 + 25);
      this.ctx.stroke();

      this.ctx.fillText((i * 25).toString(),Math.floor(wr * i * 25) + .5, this.canvas.height / 2 + 25)
    }


    //Draw target 'dots'
    this.ctx.fillStyle = 'red';
    for (const t of this.targets) {
      this.ctx.beginPath();
      this.ctx.arc(t.distance * wr, this.canvas.height / 2 - 25, 5, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    //Draw current location
    this.ctx.fillStyle = '#09c';
    this.ctx.beginPath();
    this.ctx.arc(currentDistance * wr, this.canvas.height / 2 - 25, 25, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

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
