import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgEsriMapModule } from 'ng-esri-map';
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
