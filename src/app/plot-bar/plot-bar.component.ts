import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { LatLong } from '../lat-long';
import { DataService } from '../data.service';
import { LocationService } from '../location.service';
import { Utilities } from '../utilities';

@Component({
  selector: 'app-plot-bar',
  templateUrl: './plot-bar.component.html',
  styleUrls: ['./plot-bar.component.css']
})
export class PlotBarComponent implements AfterViewInit {

  targets: Array<LatLong & { distance: number }>;

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(private dataService: DataService, private locationService: LocationService) { }

  ngAfterViewInit() {
    const dpr = window.devicePixelRatio;

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    const clientWidth = this.canvas.clientWidth;

    const width = clientWidth * dpr;
    const height = 25 * dpr;  // TODO magic number, why 25?

    this.canvas.width = width;
    this.canvas.height = height * dpr;

    this.canvas.style.width = `${clientWidth}px`;
    this.canvas.style.height = `${height}px`;

    this.getData();
  }

  getData() {
    this.locationService.getLocation().subscribe(l => {
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

    const dpr = window.devicePixelRatio;
    /** width of the canvas */
    const w = this.canvas.width;
    /** size of square that contains the icons and font */
    const iconSize = 25 * dpr;
    /** padding of the ... */
    const p = iconSize / 2 + (1 * dpr /* extra brreathing space */);
    /** vertical centerline of the canvas */
    const c = this.canvas.height / 2;
    /** width used for stroking lines */
    const lineWidth = 5 * dpr;

    let currentLocation;
    let currentDistance;

    let max: number = this.targets.reduce((a, b) => {
      return (a > b.distance ? a : b.distance);
    }, 0);

    if (this.locationService.currentLocation) {
      currentLocation = this.locationService.currentLocation;
      currentDistance = Utilities.getDistance(new LatLong(currentLocation.coords), this.dataService.currentBase);
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

    // Main bar
    this.ctx.strokeStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.moveTo(p - lineWidth / 2, c);
    this.ctx.lineTo(w - p - lineWidth / 2, c);
    this.ctx.stroke();

    // Base icon
    this.drawMarker(iconSize - 5 * dpr, 'rgba(255,255,255,.3)', p, c - lineWidth);

    // Distance markers and text
    this.ctx.fillStyle = this.ctx.strokeStyle = '#fff';
    this.ctx.font = `${iconSize}px sans-serif`;
    this.ctx.beginPath();
    for (let i = 0, x = 0; i <= Math.floor(max / 25); x = wr * ++i * 25) {
      this.ctx.moveTo(p + x, c);
      this.ctx.lineTo(p + x, c + iconSize / 2);
      this.ctx.stroke();
      this.ctx.fillText((i * 25).toString(), p + x, c + iconSize / 2);
    }
    this.ctx.closePath();

    // Targets
    for (const t of this.targets) {
      this.drawMarker(iconSize, 'rgba(255, 255, 255, .6)', p + t.distance * wr, c - lineWidth);
    }

    // Current distance
    this.drawMarker(iconSize + 5 * dpr, '#09c', p + currentDistance * wr, c - lineWidth);
  }

  /**
   * Draw a pretty marker.
   * @param height Overall height of the marker.
   * @param color Color of the marker.  CSS color string.
   * @param x X position of the bottom point of the marker.
   * @param y Y position of the bottom point of the marker.
   */
  private drawMarker(height, color, x, y) {
    const width = height * .7;
    const r = width / 2;
    const cx = x;
    const cy = y - height + r;

    this.ctx.fillStyle = color;

    this.ctx.beginPath();

    this.ctx.arc(cx, cy, r, -Math.PI, 0);
    this.ctx.quadraticCurveTo(cx + r, cy + r * .7, cx, y);
    this.ctx.quadraticCurveTo(cx - r, cy + r * .7, cx - r, cy);

    this.ctx.closePath();
    this.ctx.fill();

  }

}
