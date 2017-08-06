import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationService } from './location.service';
import { DataService } from './data.service';
import { TickService} from './tick.service';
import { LogService} from './log.service';

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
    GPSDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LocationService, DataService, TickService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
