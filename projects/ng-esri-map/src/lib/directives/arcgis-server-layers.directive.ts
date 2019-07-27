/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { layerFromArcGISServerUrlParams } from '../helpers';
import { Layer } from '../models';
import { BaseLayersDirective } from './base-layers.directive';

@Directive({
  selector: '[ngEsriArcGISServerLayers]'
})
export class ArcGISServerLayersDirective extends BaseLayersDirective<__esri.Layer> implements OnDestroy {
  @Input()
  public set ngEsriArcGISServerLayers(layers: Layer[]) {
    this.handleChanges(layers);
  }

  buildLayers(layers: Layer[]) {
    return layers.map((l: Layer) => layerFromArcGISServerUrlParams(l.url, {
      ...this.options,
      ...l
    }));
  }
}
