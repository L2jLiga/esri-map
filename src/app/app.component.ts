/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { Layer } from 'ng-esri-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public destroyed = false;
    public options = {
      latitude:  44.95648,
      longitude: -93.261678,
      layers: [],
      scaleBar: true,
      homeButton: true
    };
    public layers: Layer[] = [{
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
    }];

    public updateCoordinates({latitude, longitude}) {
      this.options = {
        ...this.options,
        latitude,
        longitude
      };
    }

    public updateOptions(options) {
      this.options = {
        ...this.options,
        ...options
      };
    }
}
