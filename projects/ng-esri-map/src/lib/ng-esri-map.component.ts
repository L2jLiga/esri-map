/// <reference types="arcgis-js-api" />
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { ILoadScriptOptions, isLoaded, loadScript } from 'esri-loader';
import * as esri from './helpers';
import { FeatureLayer, FeatureLayerOptions, MapOptions, PointOptions, PopupOptions } from './models';

const arcgisJsApi = 'https://js.arcgis.com/4.9';
const loadOptions: ILoadScriptOptions = {
  url: `${arcgisJsApi}/init.js`,
  css: `${arcgisJsApi}/esri/css/main.css`,
  dojoConfig: {
    async: true
  }
};
const noop = () => {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgEsriMapComponent implements OnDestroy {

  @ViewChild('mapElement') public mapElement: ElementRef;
  public onRightClick: (event?: __esri.MapViewClickEvent) => void = noop;
  public onDoubleClick: (event?: __esri.MapViewClickEvent) => void = noop;
  private mapView: __esri.MapView;
  private mainGraphic: __esri.Graphic;
  private secondaryGraphic: __esri.Graphic;
  private featureLayers: Promise<__esri.FeatureLayer>[] = [];
  private actions: { [action: string]: __esri.ActionButton | __esri.ActionToggle } = {};
  private actionsListeners: { [action: string]: { remove: () => void } } = {};

  constructor() {
    if (!isLoaded()) {
      loadScript(loadOptions);
    }
  }

  public ngOnDestroy(): void {
    this.destroyMap();
  }

  public buildFeatureLayersList(featureLayers: FeatureLayer[], options: FeatureLayerOptions = {
    opacity: .5,
    visible: false
  }) {
    this.featureLayers = featureLayers.map((fl: FeatureLayer) => esri.createFeatureLayer({
      ...options,
      ...fl
    }));
  }

  public async initMap(options: MapOptions): Promise<void> {
    this.destroyMap();

    const {latitude, longitude, zoom} = options;

    const map = await esri.createMap({
      basemap: 'streets',
      layers: await Promise.all(this.featureLayers)
    });

    this.mapView = await esri.createMapView({
      container: this.mapElement.nativeElement,
      map,
      zoom: zoom || 16,
      center: {longitude, latitude}
    });

    await this.mapView.when();
    await this.initBasemapGallery();
    await this.initLayersList();

    this.mapView.on('click', event => {
      if (event.button === 2) {
        this.onRightClick(event);
      }
    });
    this.mapView.on('double-click', event => this.onDoubleClick(event));
  }

  public async setMainPoint(options: PointOptions) {
    this.mapView.graphics.removeMany([this.mainGraphic]);

    const {latitude, longitude} = options;

    let popupTemplate: __esri.PopupTemplateProperties;
    if (options.popupTemplate) {
      popupTemplate = {
        title: options.popupTemplate.title,
        content: options.popupTemplate.content,
        actions: this.toActions(options.popupTemplate.actions)
      };
    }

    this.mainGraphic = await esri.createPoint(latitude, longitude, popupTemplate);

    this.mapView.graphics.add(this.mainGraphic);
  }

  public async setSecondaryGraphic(options: PointOptions) {
    this.mapView.graphics.removeMany([this.secondaryGraphic]);

    const {latitude, longitude} = options;

    let popupTemplate: __esri.PopupTemplateProperties;
    if (options.popupTemplate) {
      popupTemplate = {
        title: options.popupTemplate.title,
        content: options.popupTemplate.content,
        actions: this.toActions(options.popupTemplate.actions)
      };
    }

    this.secondaryGraphic = await esri.createPoint(latitude, longitude, popupTemplate);

    this.mapView.graphics.add(this.secondaryGraphic);
  }

  public async createPopup(options: PopupOptions) {
    const {latitude, longitude} = options.location;
    const features: __esri.Graphic[] = [];

    if (!options.actions) {
      options.actions = [];
    }

    const point = await esri.createPoint(latitude, longitude, {
      title: options.title,
      content: options.content,
      actions: this.toActions(options.actions)
    });

    features.push(point);

    this.mapView.popup.open({
      location: options.location as any,
      features
    });
  }

  public async createPopupAction(id: string,
                                 title: string,
                                 callback: (event?: __esri.PopupViewModelTriggerActionEvent) => void) {
    if (this.actions[id]) {
      this.actionsListeners[id].remove();
    }

    this.actions[id] = ({
      id,
      title
    }) as any;

    this.actionsListeners[id] = this.mapView.popup.on('trigger-action', (event: __esri.PopupViewModelTriggerActionEvent) => {
      if (event.action.id === id) {
        callback(event);
      }
    });

    return id;
  }

  private toActions(actions: string[]): Array<__esri.ActionButton | __esri.ActionToggle> {
    return actions.map(action => this.actions[action]).filter(Boolean);
  }

  private destroyMap(): void {
    if (this.mapView && this.mapView.destroy) {
      this.mapView.destroy();
    }
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

}
