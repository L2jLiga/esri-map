/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createMapImageLayer } from '../helpers';
import { Layer } from '../models';
import { BaseLayersDirective } from './base-layers.directive';

@Directive({
  selector: '[ngEsriMapImageLayers]'
})
export class MapImageLayersDirective extends BaseLayersDirective<__esri.MapImageLayer> implements OnDestroy {
  @Input()
  public set ngEsriMapImageLayers(layers: Layer[]) {
    this.handleChanges(layers);
  }

  buildLayers(mapImageLayers: Layer[]): Promise<__esri.MapImageLayer>[] {
    return mapImageLayers.map((l: Layer) => createMapImageLayer({
      ...this.options,
      ...l
    }));
  }
}
