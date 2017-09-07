import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';
import { TickService } from './tick.service';
import { LogService } from './log.service';
import { LocationService } from './location.service';

import { AppComponent } from './app.component';
import { GpsTogglerComponent } from './gps-toggler/gps-toggler.component';
import { BaseSetterComponent } from './base-setter/base-setter.component';
import { TargetAdderComponent } from './target-adder/target-adder.component';
import { PlotBarComponent } from './plot-bar/plot-bar.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { AdminComponent } from './admin/admin.component';
import { DistanceDisplayComponent } from './distance-display/distance-display.component';
import { BestAccuracySetterComponent } from './best-accuracy-setter/best-accuracy-setter.component';
import { TargetListComponent } from './target-list/target-list.component';
import { GPSDataComponent } from './gps-data/gps-data.component';
import { MapComponent } from './map/map.component';
import { DownloadDataComponent } from './download-data/download-data.component';
import { ClearDataComponent } from './clear-data/clear-data.component';

@NgModule({
  declarations: [
    AppComponent,
    GpsTogglerComponent,
    BaseSetterComponent,
    TargetAdderComponent,
    PlotBarComponent,
    LogViewerComponent,
    AdminComponent,
    DistanceDisplayComponent,
    BestAccuracySetterComponent,
    TargetListComponent,
    GPSDataComponent,
    MapComponent,
    DownloadDataComponent,
    ClearDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, TickService, LogService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
