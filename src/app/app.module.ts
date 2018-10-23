import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgEsriMapModule } from '../../projects/ng-esri-map/src/lib/ng-esri-map.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgEsriMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
