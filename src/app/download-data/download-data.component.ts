import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { DataService } from '../data.service';
import { LatLong } from '../lat-long';

@Component({
  selector: 'app-download-data',
  templateUrl: './download-data.component.html',
  styleUrls: ['./download-data.component.css']
})
export class DownloadDataComponent implements OnInit {

  jsonHref: SafeUrl;
  base: LatLong;
  targets: Array<LatLong>;

  constructor(private dataService: DataService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataService.getBase().subscribe(b => {
      this.base = b
      this.updateHref();
    });

    this.dataService.getTargets().subscribe(ta => {
      this.targets = ta
      this.updateHref();
    });
  }

  private updateHref() {
    this.jsonHref = this.domSanitizer.bypassSecurityTrustUrl(`data:text/json;charset=UTF-8,${encodeURIComponent(JSON.stringify({ 'base': this.base, 'targets': this.targets }))}`);
  }

}
