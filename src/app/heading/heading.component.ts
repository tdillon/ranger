import { Component, OnInit } from '@angular/core';

import { LocationService } from "../location.service";

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  heading: number;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getLocation().subscribe(p => this.heading = p.coords.heading)
  }

}
