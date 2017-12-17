import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { LogService } from '../log.service';

@Component({
  selector: 'app-clear-data',
  templateUrl: './clear-data.component.html',
  styleUrls: ['./clear-data.component.css']
})
export class ClearDataComponent implements OnInit {

  showDelete = false;

  constructor(private dataService: DataService, private logService: LogService) { }

  ngOnInit() { }

  clear() {
    this.dataService.setBase(null);
    this.logService.info(`ClearDataComponent - clear - removed base`);

    this.dataService.removeAllTargets().then(() =>
      this.logService.info(`ClearDataComponent - clear - removed all targets`)
    );

    this.showDelete = false;
  }

}
