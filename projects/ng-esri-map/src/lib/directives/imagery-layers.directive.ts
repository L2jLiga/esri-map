/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createImageryLayer } from '../helpers';
import { Layer } from '../models';
import { LayersDirective } from './layers.directive';

@Directive({
  selector: '[ngEsriImageryLayers]'
})
export class ImageryLayersDirective extends LayersDirective<__esri.ImageryLayer> implements OnDestroy {
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
