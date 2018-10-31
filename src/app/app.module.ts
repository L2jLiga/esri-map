import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgEsriMapModule } from '../../projects/ng-esri-map/src/public_api';
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
