import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Seven, Digit } from 'seven-segment';

import { LocationStatusData, LocationService } from '../location.service';

@Component({
  selector: 'app-distance-display',
  templateUrl: './distance-display.component.html',
  styleUrls: ['./distance-display.component.css']
})
export class DistanceDisplayComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  seven: Seven;

  distance: number = null;

  constructor(
    private locationService: LocationService
  ) {
    this.seven = new Seven();
  }

  ngAfterViewInit() {
    const dpr = window.devicePixelRatio;

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    const clientWidth = this.canvas.clientWidth;
    this.seven.width = clientWidth * dpr / 3;

    this.canvas.width = this.seven.width * 3;
    this.canvas.height = this.seven.height;

    this.canvas.style.width = `${clientWidth}px`;
    this.canvas.style.height = `${this.seven.height / dpr}px`;

    this.locationService.getLocationStatus().subscribe(l => {
      this.distance = l.dfb;
      this.draw();
    });

    this.locationService.getGPSState().subscribe(s => {
      this.distance = s ? 0 : null;
      this.draw();
    });
  }

  private draw() {
    let display;

    if (this.distance === null) {
      display = '   ';
    } else if (this.distance >= 1000) {  // [1000-infinity)
      display = '---';
    } else if (this.distance >= 0) {  // [0-999]
      display = '   '.concat(this.distance.toString()).substr(-3);
    } else {  // TODO would this ever happen
      display = '===';
    }


    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const w = this.seven.width;
    let idx = 0;

    for (const digit of display) {
      if (digit.match(/\d/)) {  // 0-9
        this.seven.digit = +digit;
      } else if (digit.match(/\s/)) {  // space
        this.seven.digit = Digit.BLANK;
      } else if (digit === '-') {
        this.seven.digit = Digit.D;  // TODO how to write only G segment?
      } else if (digit.match(/=/)) {
        this.seven.digit = Digit.D;
      }

      for (const s of this.seven.segments) {
        this.ctx.fillStyle = `rgba(255,255,255,${(s.on ? .87 : .05)})`;
        this.ctx.beginPath();
        for (const p of s.points) {
          this.ctx.lineTo(p.x + .5 + w * idx, p.y + .5);
        }
        this.ctx.closePath();
        this.ctx.fill();
      }
      ++idx;
    }
  }

}
