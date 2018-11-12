/// <reference types="arcgis-js-api" />
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ILoadScriptOptions, isLoaded, loadScript } from 'esri-loader';
import * as esri from './helpers';
import {
  HomeButtonProps,
  Layer,
  LayerOptions,
  Layers,
  MapOptions,
  PointOptions,
  PopupOptions,
  ScaleBarProps
} from './models';

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

/**
 * @ngModule NgEsriMapModule
 * @description
 *
 * Configurable map component
 *
 * @usageNotes
 *
 * ### Usage example
 *
 * ```
 * @Component({
 *   selector: 'my-map',
 *   template: '<ng-esri-map #map></ng-esri-map>',
 *   styleUrls: ['./my-map.component.css']
 * })
 * export class MyMapComponent {
 *   @ViewChild('myMap') public myMap: NgEsriMapComponent;
 *
 *   public ngOnInit() {
 *     this.myMap.initMap({latitude: 1, longitude: 2});
 *   }
 * }
 * ```
 *
 * @publicApi
 */
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
export class NgEsriMapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapElement') public mapElement: ElementRef;
  public onRightClick: (event?: __esri.MapViewClickEvent) => void = noop;
  public onDoubleClick: (event?: __esri.MapViewClickEvent) => void = noop;
  public map: __esri.Map;
  public mapView: __esri.MapView;
  public mainGraphic: __esri.Graphic;
  public secondaryGraphic: __esri.Graphic;
  private layers: Promise<__esri.Layer>[] = [];
  private actions: { [action: string]: __esri.ActionButton | __esri.ActionToggle } = {};
  private actionsListeners: { [action: string]: { remove: () => void } } = {};
  private clearPopup: (v?: boolean) => void = noop;

  constructor(private cdr: ChangeDetectorRef) {
    if (!isLoaded()) {
      loadScript(loadOptions);
    }
  }

  public ngAfterViewInit(): void {
    this.cdr.detach();
  }

  public ngOnDestroy(): void {
    this.destroyAllLayers();

    this.destroyMap();
  }

  /**
   * @description
   * Build layers list from arcgis server URL
   *
   * @publicApi
   */
  public buildLayersFromUrl(layers: Layers, options: LayerOptions = {
    opacity: .5,
    visible: false
  }) {
    const layersFromArcGISServer = layers.map((l: Layer) => esri.layerFromArcGISServerUrlParams(l.url, {
      ...options,
      ...l
    }));

    this.layers.push(...layersFromArcGISServer);
  }

  /**
   * @description
   * Build feature layers list from given array with parameters
   * Each layer should have at least URL
   *
   * @publicApi
   */
  public buildFeatureLayersList(layers: Layers, options: LayerOptions = {
    opacity: .5,
    visible: false
  }) {
    const featureLayers = layers.map((l: Layer) => esri.createFeatureLayer({
      ...options,
      ...l
    }));

    this.layers.push(...featureLayers);
  }

  /**
   * @description
   * Build imagery layers list from given array with parameters
   * Each layer should have at least URL
   *
   * @publicApi
   */
  public buildImageryLayersList(layers: Layers, options: LayerOptions = {
    opacity: .5,
    visible: false
  }) {
    const imageryLayers = layers.map((l: Layer) => esri.createImageryLayer({
      ...options,
      ...l
    }));

    this.layers.push(...imageryLayers);
  }

  /**
   * @description
   * Build map image layers list from given array with parameters
   * Each layer should have at least URL
   *
   * @publicApi
   */
  public buildMapImageLayersList(layers: Layers, options: LayerOptions = {
    opacity: .5,
    visible: false
  }) {
    const mapImageLayers = layers.map((l: Layer) => esri.createMapImageLayer({
      ...options,
      ...l
    }));

    this.layers.push(...mapImageLayers);
  }

  /**
   * @description
   * Destroy all layers and remove them from the map
   *
   * @publicApi
   */
  public async clearAllLayers() {
    if (this.map) {
      this.map.layers.removeAll();
    }

    await this.destroyAllLayers();
  }

  /**
   * @description
   * Initialize base map with center in given coordinates
   *
   * @publicApi
   */
  public async initMap(options: MapOptions): Promise<void> {
    this.destroyMap();

    const {latitude, longitude, zoom} = options;
    let layers;
    try {
      layers = await Promise.all(this.layers);
    } catch (error) {
      console.error('An error happened while resolving layers');
    }

    this.map = await esri.createMap({
      basemap: 'streets',
      layers
    });

    this.mapView = await esri.createMapView({
      container: this.mapElement.nativeElement,
      map: this.map,
      zoom: zoom || 16,
      center: {longitude, latitude}
    });

    await this.mapView.when();

    this.initBasemapGallery().catch(noop);
    this.initLayersList().catch(noop);

    this.createMapListener('click', event => {
      if (event.button === 2) {
        this.onRightClick(event);
      }
    });
    this.createMapListener('double-click', event => this.onDoubleClick(event));

    if (options.scaleBar) {
      await this.initScaleBar(options.scaleBarProps);
    }

    if (options.homeButton) {
      await this.initHomeButton(options.homeButtonProps);
    }
  }

  /**
   * @description
   * Put main point on the map
   * BTW on map can exists only two points (just an restriction of current component)
   * Each usage of this method will replace previous one
   *
   * @publicApi
   */
  public async setMainPoint(options: PointOptions) {
    this.removeMainGraphic();

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

    this.addGraphic(this.mainGraphic);
  }

  /**
   * @description
   * Remove main graphic from the map
   *
   * @publicApi
   */
  public removeMainGraphic() {
    this.removeGraphic(this.mainGraphic);

    this.mainGraphic = null;
  }

  /**
   * @description
   * Put secondary point on the map
   * BTW on map can exists only two points (just an restriction of current component)
   * Each usage of this method will replace previous one
   *
   * @publicApi
   */
  public async setSecondaryGraphic(options: PointOptions) {
    this.removeSecondaryGraphic();

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

    this.addGraphic(this.secondaryGraphic);
  }

  /**
   * @description
   * Remove secondary graphic from the map
   *
   * @publicApi
   */
  public removeSecondaryGraphic() {
    this.removeGraphic(this.secondaryGraphic);

    this.secondaryGraphic = null;
  }

  /**
   * @description
   * Create popup in given location with given title, content and actions list
   *
   * @publicApi
   */
  public async createPopup(options: PopupOptions) {
    this.clearPopup();

    const {latitude, longitude} = options.location;

    if (!options.actions) {
      options.actions = [];
    }

    const point = await esri.createPoint(latitude, longitude, {
      title: options.title,
      content: options.content,
      actions: this.toActions(options.actions)
    });

    this.mapView.popup.open({
      location: point.geometry,
      features: [point]
    });

    if (options.showPointOnMap) {
      this.initPopupCleaner(point);
    }
  }

  /**
   * @description
   * Create actions which can be added to popup
   * If action with given ID already exists then it will replace it
   * If map was destroyed then return void
   *
   * @publicApi
   */
  public createPopupAction(id: string,
                           title: string,
                           callback: (event?: __esri.PopupViewModelTriggerActionEvent) => void) {
    if (!this.mapView) {
      return;
    }

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

  private async initScaleBar(props: ScaleBarProps = {}) {
    const position = props.position || 'bottom-right';

    const scaleBar = await esri.createScaleBar({
      ...props,
      view: this.mapView
    });

    this.addWidget(scaleBar, position);
  }

  private async initHomeButton(props: HomeButtonProps = {}) {
    const position = props.position || 'top-left';

    const homeButton = await esri.createHomeButton({
      ...props,
      view: this.mapView
    });

    this.addWidget(homeButton, position);
  }

  private initPopupCleaner(point: __esri.Graphic): void {
    this.addGraphic(point);

    const subscription = this.mapView.popup.watch('visible', v => this.clearPopup(v));

    this.clearPopup = visible => {
      if (visible) {
        return;
      }

      subscription.remove();
      this.clearPopup = noop;
      this.removeGraphic(point);
    };
  }

  private toActions(actions: string[]): Array<__esri.ActionButton | __esri.ActionToggle> {
    if (!actions || !Array.isArray(actions)) {
      return [];
    }

    return actions.map(action => this.actions[action]).filter(Boolean);
  }

  private async destroyAllLayers() {
    while (this.layers.length) {
      const layer = await this.layers.pop();

      layer.destroy();
    }
  }

  private destroyMap(): void {
    if (this.mapView && this.map.destroy) {
      this.map.destroy();

      this.map = null;
      this.mapView = null;
    }
  }

  private async initBasemapGallery(): Promise<void> {
    const bgExpand = await esri.createBasemapsGallery({
      view: this.mapView
    }, {});

    this.addWidget(bgExpand, 'top-left');
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

    this.addWidget(layerList, 'top-right');
  }

  private createMapListener(action: string, callback: (event?: __esri.MapViewClickEvent) => void) {
    if (this.mapView) {
      this.mapView.on(action, callback);
    }
  }

  private addWidget(widget: __esri.Widget, position: string) {
    if (this.mapView) {
      this.mapView.ui.add(widget, position);
    }
  }

  private addGraphic(graphic: __esri.Graphic) {
    if (this.mapView) {
      this.mapView.graphics.add(graphic);
    }
  }

  private removeGraphic(graphic: __esri.Graphic) {
    if (this.mapView) {
      this.mapView.graphics.remove(graphic);
    }
  }
}
