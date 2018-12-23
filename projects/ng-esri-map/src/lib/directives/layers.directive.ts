/// <reference types="arcgis-js-api" />
import { Host, Input, OnDestroy, Self } from '@angular/core';
import { noop, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Layer, LayerOptions } from '../models';
import { EsriMapDirective } from './esri-map.directive';

const defaultOptions = {
  opacity: .5,
  visible: false
};

export class LayersDirective<T extends __esri.Layer> implements OnDestroy {
  protected layers: Promise<T>[] = [];
  private newLayers$: Subject<void> = new Subject();

  private _options: LayerOptions = defaultOptions;

  public get options() {
    return this._options;
  }

  @Input()
  public set options(options: LayerOptions) {
    this._options = {
      ...defaultOptions,
      ...options
    };
  }

  constructor(@Host() @Self() protected mapDirective: EsriMapDirective) {
  }

  public ngOnDestroy(): void {
    this.newLayers$.next();
    this.newLayers$.complete();
  }

  protected handleChanges(layers: Layer[]) {
    this.newLayers$.next();

    this.mapDirective.mapInstance$
      .pipe(
        filter(Boolean),
        map(() => this.destroyAllLayers()),
        map(() => this.buildLayers(layers)),
        switchMap(() => this.addLayersToMap()),
        takeUntil(this.newLayers$)
      ).subscribe(noop, noop);
  }

  protected buildLayers(layers: Layer[]) {}

  private addLayersToMap() {
    return Promise.all(this.layers)
      .then(layers => this.mapDirective.map.layers.addMany(layers));
  }

  private destroyAllLayers() {
    while (this.layers.length) {
      this.layers.pop().then(layer => this.destroyLayer(layer));
    }
  }

  private destroyLayer(layer: T) {
    this.mapDirective.map.layers.remove(layer);
    layer.destroy();
  }
}
