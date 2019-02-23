/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

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
