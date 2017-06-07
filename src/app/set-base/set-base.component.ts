import { Component, OnInit } from '@angular/core';

import { DataService } from "../data.service";
import { LocationService } from "../location.service";

@Component({
  selector: 'app-set-base',
  templateUrl: './set-base.component.html',
  styleUrls: ['./set-base.component.css']
})
export class SetBaseComponent implements OnInit {
  base :Coordinates;
  base2:Position;

  constructor(private dataService: DataService, private locationService :LocationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getBase().then(b => this.base = b);
  }

  setBase() {
    this.base2 = this.locationService.getLocation().getValue();
    console.log(this.base2);
  }

}
