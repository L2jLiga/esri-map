/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, Host, Input, OnDestroy, Self } from '@angular/core';
import { noop, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Layer, LayerOptions } from '../models';
import { EsriMapDirective } from './esri-map.directive';

const defaultOptions = {
  opacity: .5,
  visible: false
};

// TODO: Remove directive decorator after https://github.com/angular/angular/issues/30080
@Directive({
  selector: '[ngEsriBaseLayersDirective]'
})
export class BaseLayersDirective<T extends __esri.Layer> implements OnDestroy {
  protected layers: Promise<T>[] = [];
  private newLayers$: Subject<void> = new Subject();

  private _options: LayerOptions = defaultOptions;

  public get options(): LayerOptions {
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

  protected handleChanges(layers: Layer[]): void {
    this.newLayers$.next();

    this.mapDirective.mapInstance$
      .pipe(
        filter(Boolean),
        switchMap(() => this.destroyAllLayers()),
        filter(Array.isArray),
        map(() => this.buildLayers(layers)),
        tap(l => this.layers = l),
        switchMap(() => this.addLayersToMap()),
        takeUntil(this.newLayers$)
      ).subscribe(noop, noop);
  }

  protected buildLayers(layers: Layer[]): Promise<T>[] {
    return [];
  }

  private addLayersToMap(): Promise<void> {
    return Promise.all(this.layers)
      .then(layers => this.mapDirective.map.layers.addMany(layers));
  }

  private destroyAllLayers(): Promise<void[]> {
    return Promise.all(
      this.layers.map(promise => promise.then(layer => this.destroyLayer(layer)))
    ).finally(() => this.layers = []);
  }

  private destroyLayer(layer: T): void {
    this.mapDirective.map.layers.remove(layer);
    layer.destroy();
  }
}
