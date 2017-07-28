import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Seven, Digit } from "seven-segment";

import { Utilities } from "../utilities";
import { LocationService } from "../location.service";
import { DataService } from "../data.service";

@Component({
  selector: 'app-distance-display',
  templateUrl: './distance-display.component.html',
  styleUrls: ['./distance-display.component.css']
})
export class DistanceDisplayComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasElementRef: ElementRef;
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D;
  seven: Seven;

  distance: number = null;

  constructor(
    private locationService: LocationService,
    private dataService: DataService
  ) {
    this.seven = new Seven();
  }

  ngAfterViewInit() {
    let clientWidth = document.documentElement.clientWidth;
    let devicePixelRatio = window.devicePixelRatio;

    this.seven.width = ((clientWidth - 32) * devicePixelRatio) / 3;  //TODO figure out padding/spacing

    this.canvas = this.canvasElementRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.seven.width * 3;
    this.canvas.height = this.seven.height;

    this.canvas.style.width = `${clientWidth - 32}px`;  //TODO figure out padding/spacing
    this.canvas.style.height = `${this.seven.height / devicePixelRatio}px`;

    this.locationService.getLocation().subscribe(p => {
      this.distance = Utilities.getDistance(this.dataService.currentBase, p.coords);
      this.draw();
    });
  }

  private draw() {
    console.log(this.distance);

    let display;

    if (this.distance === null) {
      display = '   '
    } else if (this.distance >= 1000) {  //[1000-infinity)
      display = '---'
    } else if (this.distance >= 0) {  //[0-999]
      display = '   '.concat(this.distance.toString()).substr(-3);
    } else {  //TODO would this ever happen
      display = '===';
    }


    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let w = this.seven.width;
    let idx = 0;

    for (const digit of display) {
      console.log(`Write ${digit} to the canvas`);

      if (digit.match(/\d/)) {  //0-9
        this.seven.digit = +digit;
      } else if (digit.match(/\s/)) {  //space
        this.seven.digit = Digit.BLANK;
      } else if (digit === '-') {
        this.seven.digit = Digit.D;  //TODO how to write only G segment?
      } else if (digit.match(/=/)){
        this.seven.digit = Digit.D;
      }

      for (let s of this.seven.segments) {
        this.ctx.fillStyle = `rgba(255,255,255,${(s.on ? .87 : .05)})`;
        this.ctx.beginPath();
        for (let p of s.points) {
          this.ctx.lineTo(p.x + .5 + w * idx, p.y + .5);
        }
        this.ctx.closePath();
        this.ctx.fill();
      }
      ++idx;
    }
  }

}
