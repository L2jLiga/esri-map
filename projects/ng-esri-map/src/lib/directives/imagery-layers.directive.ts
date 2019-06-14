/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createImageryLayer } from '../helpers';
import { Layer } from '../models';
import { AbstractDirectiveForLayers } from './abstract-directive-for-layers';

@Directive({
  selector: '[ngEsriImageryLayers]'
})
export class ImageryLayersDirective extends AbstractDirectiveForLayers<__esri.ImageryLayer> implements OnDestroy {
  @Input()
  public set ngEsriImageryLayers(layers: Layer[]) {
    this.handleChanges(layers);
  }

  buildLayers(imageryLayers: Layer[]) {
    return imageryLayers.map((l: Layer) => createImageryLayer({
      ...this.options,
      ...l
    }));
  }
}
