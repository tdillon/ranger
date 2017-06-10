import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationService } from './location.service';
import { DataService } from "./data.service";
import { TickService} from "./tick.service";
import { LogService} from "./log.service";

import { AppComponent } from './app.component';
import { GpsTogglerComponent } from './gps-toggler/gps-toggler.component';
import { GpsAccuracyComponent } from './gps-accuracy/gps-accuracy.component';
import { GpsFreshnessComponent } from './gps-freshness/gps-freshness.component';
import { BaseSetterComponent } from './base-setter/base-setter.component';
import { TargetAdderComponent } from './target-adder/target-adder.component';
import { PlotBarComponent } from './plot-bar/plot-bar.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    GpsTogglerComponent,
    GpsAccuracyComponent,
    GpsFreshnessComponent,
    BaseSetterComponent,
    TargetAdderComponent,
    PlotBarComponent,
    LogViewerComponent
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
