/// <reference types="arcgis-js-api" />
import { Directive, Input, OnDestroy } from '@angular/core';
import { layerFromArcGISServerUrlParams } from '../helpers';
import { Layer } from '../models';
import { LayersDirective } from './layers.directive';

@Directive({
  selector: '[ngEsriArcGISServerLayers]'
})
export class ArcGISServerLayersDirective extends LayersDirective<__esri.Layer> implements OnDestroy {
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
