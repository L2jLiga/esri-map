/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createMapImageLayer } from '../helpers';
import { Layer } from '../models';
import { LayersDirective } from './layers.directive';

@Directive({
  selector: '[ngEsriMapImageLayers]'
})
export class MapImageLayersDirective extends LayersDirective<__esri.MapImageLayer> implements OnDestroy {
  @Input()
  public set ngEsriMapImageLayers(layers: Layer[]) {
    this.handleChanges(layers);
  }

  buildLayers(mapImageLayers: Layer[]) {
    return mapImageLayers.map((l: Layer) => createMapImageLayer({
      ...this.options,
      ...l
    }));
  }
}
