/// <reference types="arcgis-js-api" />
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { ILoadScriptOptions, isLoaded, loadScript } from 'esri-loader';
import * as esri from './helpers';
import { FeatureLayer, NgEsriMapOptions } from './models';

const arcgisJsApi = 'https://js.arcgis.com/4.9';
const defaultOptions: NgEsriMapOptions = {
  point: {
    showOnMap: true,
    latitude: null,
    longitude: null
  },
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
  private mapView: __esri.MapView;
  private pointGraphic: __esri.Graphic;
  private customPoint: __esri.Graphic;
  private readonly loadOptions: ILoadScriptOptions = {
    url: `${arcgisJsApi}/init.js`,
    css: `${arcgisJsApi}/esri/css/main.css`,
    dojoConfig: {
      async: true
    }
  };
  private featureLayers: Promise<__esri.FeatureLayer>[];

  private _options: NgEsriMapOptions;

  public get options() {
    return this._options;
  }

  @Input()
  public set options(options: NgEsriMapOptions) {
    this._options = {
      ...defaultOptions,
      ...options,
      point: {
        ...defaultOptions.point,
        ...options.point
      }
    };

    this.initFeatureLayers();

    this.init();
  }

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

    this.initClickListener();
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

    const {zoom} = this.options;
    const {latitude, longitude} = this.options.point;

    const map = await esri.createMap({
      basemap: 'streets',
      layers: await Promise.all(this.featureLayers)
    });

    this.mapView = await esri.createMapView({
      container: this.mapElement.nativeElement,
      map,
      zoom,
      center: {
        latitude,
        longitude
      }
    });

    await this.mapView.when();
  }

  private async initBasemapGallery(): Promise<void> {
    const bgExpand = await esri.createBasemapsGallery({
      view: this.mapView
    }, {});

    await this.mapView.ui.add(bgExpand, 'top-left');
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

  private async initPoint() {
    if (!this.options.point.showOnMap) {
      return;
    }

    const {latitude, longitude} = this.options.point;

    this.pointGraphic = await esri.createPoint(latitude, longitude);

    this.mapView.graphics.add(this.pointGraphic);
  }

  private initClickListener() {
    if (this.options.point.showOnMap) {
      this.mapView.on('click', (event: __esri.MapViewClickEvent) => this.putPoint(event));
    }
  }

  private async putPoint(event: __esri.MapViewClickEvent) {
    this.mapView.graphics.removeMany([this.customPoint]);

    const {latitude, longitude} = event.mapPoint;

    this.customPoint = await esri.createPoint(latitude, longitude);

    this.mapView.graphics.add(this.customPoint);
  }

  private destroyMap(): void {
    if (this.mapView && this.mapView.destroy) {
      this.mapView.destroy();
    }
  }

}
