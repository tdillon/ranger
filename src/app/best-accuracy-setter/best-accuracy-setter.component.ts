import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-best-accuracy-setter',
  templateUrl: './best-accuracy-setter.component.html',
  styleUrls: ['./best-accuracy-setter.component.css']
})
export class BestAccuracySetterComponent implements OnInit {

  accuracy: number;

  constructor(
    private dataService: DataService,
    private logService: LogService
  ) {
    this.logService.info('BestAccuracySetterComponent constructor');
  }

  ngOnInit() {
    this.dataService.getAccuracy().subscribe(a => this.accuracy = a);
  }

  updateAccuracy(value: number) {
    this.dataService.setAccuracy(this.accuracy + value);
  }

}
