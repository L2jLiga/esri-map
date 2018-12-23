/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { createFeatureLayer } from '../helpers';
import { Layer } from '../models';
import { LayersDirective } from './layers.directive';

@Directive({
  selector: '[ngEsriFeatureLayers]'
})
export class FeatureLayersDirective extends LayersDirective<__esri.FeatureLayer> implements OnDestroy {
  @Input()
  public set ngEsriFeatureLayers(featureLayers: Layer[]) {
    this.handleChanges(featureLayers);
  }

  buildLayers(featureLayers: Layer[]) {
    const layers = featureLayers.map((l: Layer) => createFeatureLayer({
      ...this.options,
      ...l
    }));

    this.layers.push(...layers);
  }
}
