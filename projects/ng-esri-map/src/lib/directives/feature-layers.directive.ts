/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createFeatureLayer } from '../helpers';
import { Layer } from '../models';
import { BaseLayersDirective } from './base-layers.directive';

@Directive({
  selector: '[ngEsriFeatureLayers]'
})
export class FeatureLayersDirective extends BaseLayersDirective<__esri.FeatureLayer> implements OnDestroy {
  @Input()
  public set ngEsriFeatureLayers(featureLayers: Layer[]) {
    this.handleChanges(featureLayers);
  }

  buildLayers(featureLayers: Layer[]): Promise<__esri.FeatureLayer>[] {
    return featureLayers.map((l: Layer) => createFeatureLayer({
      ...this.options,
      ...l
    }));
  }
}
