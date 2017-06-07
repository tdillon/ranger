import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LocationService } from './location.service';
import { DataService } from "./data.service";
import { HeadingComponent } from './heading/heading.component';
import { SetBaseComponent } from './set-base/set-base.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    SetBaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
