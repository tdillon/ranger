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
    let dpr = window.devicePixelRatio;

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let clientWidth = this.canvas.clientWidth;

    let width = clientWidth * dpr;
    let height = 25 * dpr;  //TODO magic number, why 25?

    this.canvas.width = width;
    this.canvas.height = height * dpr;

    this.canvas.style.width = `${clientWidth}px`
    this.canvas.style.height = `${height}px`;

    this.getData();
  }

  getData() {
    this.locationService.getLocation().subscribe(l => {
      this.draw();
    });

    this.dataService.getTargets().subscribe(t => {
      this.targets = t.map(target => {
        return { ...target, distance: this.getDistance(target, this.dataService.currentBase) }
      });

      this.draw();
    });
  }

  private draw() {
    /**
     * TODO
     * if - no base - return
     * else if - base, no targets, no current - return
     * else - base, (targets || current) - draw (figure out max distances)
     */
    if (this.targets.length == 0) return;

    const dpr = window.devicePixelRatio;
    /** width of the canvas */
    const w = this.canvas.width;
    /** size of square that contains the icons and font */
    const iconSize = 20 * dpr;
    /** padding of the ... */
    const p = iconSize / 2 + (1 * dpr /* extra brreathing space */);
    /** vertical centerline of the canvas */
    const c = this.canvas.height / 2;
    /** width used for stroking lines */
    const lineWidth = 5 * dpr;

    let currentLocation;
    let currentDistance;

    let max: number = this.targets.reduce((a, b, c, d) => {
      return (a > b.distance ? a : b.distance);
    }, 0);

    if (this.locationService.currentLocation) {
      currentLocation = this.locationService.currentLocation;
      currentDistance = this.getDistance(new LatLong(currentLocation.coords), this.dataService.currentBase);
    }

    if (currentDistance > max) {
      max = currentDistance;
    }

    max = Math.min(max, 1000);
    /** ratio of line bar width to maximum distance */
    const wr = (w - 2 * p) / max;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = lineWidth;

    //Main bar
    this.ctx.strokeStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.moveTo(p, c);
    this.ctx.lineTo(w - p, c);
    this.ctx.stroke();

    //Base icon
    this.ctx.fillStyle = '#00de00';
    this.ctx.fillRect(p - iconSize / 2, c - iconSize - lineWidth, iconSize, iconSize);

    //Distance markers and text
    this.ctx.fillStyle = this.ctx.strokeStyle = 'white';
    this.ctx.font = `${iconSize}px sans-serif`;
    for (let i = 0, x = 0; i <= Math.floor(max / 25); x = wr * ++i * 25) {
      this.ctx.moveTo(p + x, c);
      this.ctx.lineTo(p + x, c + iconSize);
      this.ctx.stroke();
      this.ctx.fillText((i * 25).toString(), p + x, c + iconSize);
    }

    //Targets
    this.ctx.fillStyle = '#f00';
    for (const t of this.targets) {
      this.ctx.beginPath();
      this.ctx.arc(p + t.distance * wr, c - iconSize / 2 - lineWidth, iconSize / 2, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    //Current distance
    this.ctx.fillStyle = '#09c';
    this.ctx.beginPath();
    this.ctx.moveTo(p + currentDistance * wr, c - lineWidth);
    this.ctx.lineTo(p + currentDistance * wr + iconSize / 2, c - lineWidth - iconSize);
    this.ctx.lineTo(p + currentDistance * wr - iconSize / 2, c - lineWidth - iconSize);
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
