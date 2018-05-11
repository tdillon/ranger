import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { LatLong } from '../lat-long';
import { DataService } from '../data.service';
import { LocationService, LocationStatusData } from '../location.service';
import { Utilities } from '../utilities';

@Component({
  selector: 'app-plot-map',
  templateUrl: './plot-map.component.html',
  styleUrls: ['./plot-map.component.css']
})
export class PlotMapComponent implements AfterViewInit {

  targets: Array<LatLong & { distance: number }>;
  private status: LocationStatusData;

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    private dataService: DataService,
    private locationService: LocationService
  ) { }

  ngAfterViewInit() {
    const dpr = window.devicePixelRatio;

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    const clientWidth = this.canvas.clientWidth;
    const width = clientWidth * dpr;

    this.canvas.width = this.canvas.height = width;
    this.canvas.style.width = this.canvas.style.height = `${clientWidth}px`;

    this.getData();
  }

  getData() {
    this.locationService.getLocationStatus().subscribe(s => {
      this.status = s;
      this.draw();
    });

    this.dataService.getTargets().subscribe(t => {
      this.targets = t.map(target => {
        return { ...target, distance: Utilities.getDistance(target, this.dataService.currentBase) };
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
    if (!this.targets || this.targets.length === 0) {
      return;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const dpr = window.devicePixelRatio;
    /** width of the canvas */
    const w = this.canvas.width;
    /** size of square that contains the icons and font */
    const iconSize = 25 * dpr;
    /** padding of the ... */
    const p = iconSize / 2 + (1 * dpr /* extra breathing space */);
    /** vertical centerline of the canvas */
    const c = this.canvas.height / 2;
    /** width used for stroking lines */
    const lineWidth = 5 * dpr;

    const base = this.dataService.currentBase;
    const currentLocation = this.status.position ? {
      latitude: this.status.position.coords.latitude,
      longitude: this.status.position.coords.longitude,
      distance: Utilities.getDistance(this.status.position.coords, this.dataService.currentBase),
      x:0,
      y:0 
    } : null;
    
    const maxDistance = this.targets.reduce((accum, cur) => Math.max(cur.distance, accum), currentLocation ? currentLocation.distance : Number.MIN_SAFE_INTEGER);
    const pxPerDistance = w / 2 / maxDistance;

    if (currentLocation){
      const a = Math.atan2(currentLocation.longitude - base.longitude, currentLocation.latitude - base.latitude) + Math.PI;
      currentLocation.x = w/2 - pxPerDistance * currentLocation.distance * Math.sin(a);
      currentLocation.y =  w/2 + pxPerDistance* currentLocation.distance * Math.cos(a);
    }

    const plotTargets = this.targets.map(t => {
      const a = Math.atan2(t.longitude - base.longitude, t.latitude - base.latitude) + Math.PI;
      return {...t,  x: w/2 - pxPerDistance * t.distance * Math.sin(a) ,y: w/2 + pxPerDistance* t.distance * Math.cos(a)};
    });

    for (let i = 25; i <= maxDistance; i+=25) {
      this.ctx.lineWidth = (i % 100 ? 1 : 2) * dpr;
      this.ctx.strokeStyle = `rgba(255,255,255,.6)`;
      this.ctx.beginPath();
      this.ctx.arc(w/2,w/2, i * pxPerDistance, 0 , Math.PI * 2);
      this.ctx.stroke();
    }
    
    
    // TODO My markers appear to leave padding on the bottom and right sides of the canvas.  Why?

    // TODO Add option to set the origin at the current location

    // TODO Add concentric circles with distance text.
    // Origin of circle should be base or current, based on some option.
    
    // Draw base marker
    Utilities.drawMarker(
      this.ctx,
      iconSize,
      '#00DB4A',
      w/2,
      w/2
    );
    
    // Draw target markers
    plotTargets.forEach(t =>
      Utilities.drawMarker(
        this.ctx,
        iconSize,
        '#fff',
        t.x,
        t.y
      )
    );

    // Draw current location marker
    if (currentLocation) {
      Utilities.drawMarker(
        this.ctx,
        iconSize,
        '#09c',
        currentLocation.x,
        currentLocation.y
      );
    }
  }
}
