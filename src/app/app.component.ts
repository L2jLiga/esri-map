/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { ɵmarkDirty as markDirty } from '@angular/core';
import { Layer } from 'ng-esri-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public options = {
      latitude:  44.95648,
      longitude: -93.261678,
      layers: [],
      scaleBar: true,
      homeButton: true
    };

    public set layers(value: Layer[]) {
        this._layers = value;
        markDirty(this);
    }
    public get layers(): Layer[] {
        return this._layers;
    }

    public set destroyed(value: boolean) {
        this._destroyed = value;
        markDirty(this);
    }
    public get destroyed(): boolean {
        return this._destroyed;
    }

    private _destroyed = false;
    private _layers: Layer[] = [{
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
    }];

    public updateCoordinates({latitude, longitude}) {
      this.options = {
        ...this.options,
        latitude,
        longitude
      };
      markDirty(this);
    }

    public updateOptions(options) {
      this.options = {
        ...this.options,
        ...options
      };
      markDirty(this);
    }
}
