import { Component, OnInit } from '@angular/core';

import { LogService, LogMessage } from '../log.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {

  logs: Array<LogMessage> = [];

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLog().subscribe(l => this.logs.unshift(l));
  }

}
