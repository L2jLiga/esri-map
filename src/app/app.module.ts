import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgEsriMapModule } from 'ng-esri-map';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgEsriMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
