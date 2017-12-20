import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LatLong } from '../lat-long';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private targets: Array<LatLong>;
  private base: LatLong;
  public key = 'AIzaSyBqNdq7V41d_5WXdL1P9cgjkTQkBBI27O8';
  public markers: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBase().subscribe(b => this.generateQuery(this.base = b));
    this.dataService.getTargets().subscribe(t => this.generateQuery(this.targets = t));
  }

  generateQuery(x: any) {
    this.markers = '';
    (this.targets || []).concat([this.base]).forEach(t =>
      this.markers += `&markers=size:tiny%7Ccolor:0xFFFFFF44%7c${t.latitude},${t.longitude}`
    );
  }

}
