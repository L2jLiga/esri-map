/// <reference types="arcgis-js-api" />
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ILoadScriptOptions, isLoaded, loadScript } from 'esri-loader';
import * as esri from './helpers';
import { NgEsriMapOptions } from './models';
import { FeatureLayer } from './models/feature-layer.interface';

const arcgisJsApi = 'https://js.arcgis.com/4.9';
const defaultOptions: NgEsriMapOptions = {
  latitude: null,
  longitude: null,
  featureLayers: [],
  layersOpacity: 0.5,
  zoom: 16
};

@Component({
  selector: 'ng-esri-map',
  template: `
    <div #mapElement
         id="map"
         class="map"></div>`,
  styles: [`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
    }

    div.map {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgEsriMapComponent implements OnDestroy {
  @ViewChild('mapElement') public mapElement: ElementRef;

  @Input()
  public set options(options: NgEsriMapOptions) {
    this._options = Object.assign({}, defaultOptions, options);
    this.initFeatureLayers();

    this.init();
  }

  public get options() {
    return this._options;
  }

  private mapView: __esri.MapView;
  private pointGraphic: __esri.Graphic;
  private readonly loadOptions: ILoadScriptOptions = {
    url: `${arcgisJsApi}/init.js`,
    css: `${arcgisJsApi}/esri/css/main.css`,
    dojoConfig: {
      async: true
    }
  };

  private _options: NgEsriMapOptions;

  private featureLayers: Promise<__esri.FeatureLayer>[];

  constructor() {
    if (!isLoaded()) {
      loadScript(this.loadOptions);
    }
  }

  public ngOnDestroy(): void {
    this.destroyMap();
  }

  private async init() {
    await this.initMap();
    await this.initBasemapGallery();
    await this.initPoint();
    await this.initLayersList();
  }

  private initFeatureLayers() {
    this.featureLayers = this.options.featureLayers.map((fl: FeatureLayer) => esri.createFeatureLayer({
      ...fl,
      opacity: .5,
      visible: false
    }));
  }

  private async initMap(): Promise<void> {
    this.destroyMap();

    const {latitude, longitude, zoom} = this.options;

    const map = await esri.createMap({
      basemap: 'streets',
      layers: await Promise.all(this.featureLayers)
    });

    this.mapView = await esri.createMapView({
      container: this.mapElement.nativeElement,
      map,
      zoom,
      center: {longitude, latitude}
    });

    await this.mapView.when();
  }

  private async initBasemapGallery(): Promise<void> {
    const bgExpand = await esri.createBasemapsGallery({
      view: this.mapView
    }, {});

    await this.mapView.ui.add(bgExpand, 'top-left');
  }

  private async initPoint() {
    const {latitude, longitude} = this.options;

    const geometry: any = {
      type: 'point', // autocasts as new Point()
      longitude,
      latitude
    };

    const symbol = {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    };

    this.pointGraphic = await esri.createGraphic({
      geometry,
      symbol
    });

    this.mapView.graphics.add(this.pointGraphic);
  }

  private async initLayersList(): Promise<void> {
    const layerList = await esri.createLayersList({
      view: this.mapView,
      listItemCreatedFunction: function (event) {
        const item = event.item;
        if (item.layer.type !== 'group') {
          item.panel = {
            content: 'legend',
            open: false
          };
        }
      }
    });

    this.mapView.ui.add(layerList, 'top-right');
  }

  private destroyMap(): void {
    if (this.mapView && this.mapView.destroy) {
      this.mapView.destroy();
    }
  }

}
