/// <reference types="arcgis-js-api" />
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
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
export class NgEsriMapComponent implements OnDestroy {

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

  constructor() {
    if (!isLoaded()) {
      loadScript(loadOptions);
    }
  }

  public ngOnDestroy(): void {
    this.destroyMap();
  }

  /**
   * @description
   * Build layers list from arcgis server URL
   */
  public buildLayersFromUrl(layers: Layers, options: LayerOptions = {
    opacity: .5,
    visible: false
  }) {
    this.layers = layers.map((l: Layer) => esri.layerFromArcGISServerUrlParams(l.url, {
      ...options,
      ...l
    })).concat(this.layers);
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
    this.layers = layers.map((l: Layer) => esri.createFeatureLayer({
      ...options,
      ...l
    })).concat(this.layers);
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
    this.layers = layers.map((l: Layer) => esri.createImageryLayer({
      ...options,
      ...l
    }));
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
    this.layers = layers.map((l: Layer) => esri.createMapImageLayer({
      ...options,
      ...l
    }));
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
    await this.initBasemapGallery();
    await this.initLayersList();

    this.mapView.on('click', event => {
      if (event.button === 2) {
        this.onRightClick(event);
      }
    });
    this.mapView.on('double-click', event => this.onDoubleClick(event));

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

    this.mapView.graphics.add(this.mainGraphic);
  }

  /**
   * @description
   * Remove main graphic from the map
   *
   * @publicApi
   */
  public removeMainGraphic() {
    this.mapView.graphics.remove(this.mainGraphic);

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

    this.mapView.graphics.add(this.secondaryGraphic);
  }

  /**
   * @description
   * Remove secondary graphic from the map
   *
   * @publicApi
   */
  public removeSecondaryGraphic() {
    this.mapView.graphics.remove(this.secondaryGraphic);

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
   *
   * @publicApi
   */
  public createPopupAction(id: string,
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

  private async initScaleBar(props: ScaleBarProps = {}) {
    const position = props.position || 'bottom-right';

    const scaleBar = await esri.createScaleBar({
      ...props,
      view: this.mapView
    });

    this.mapView.ui.add(scaleBar, position);
  }

  private async initHomeButton(props: HomeButtonProps = {}) {
    const position = props.position || 'top-left';

    const homeButton = await esri.createHomeButton({
      ...props,
      view: this.mapView
    });

    this.mapView.ui.add(homeButton, position);
  }

  private initPopupCleaner(point: __esri.Graphic): void {
    this.mapView.graphics.add(point);

    const subscription = this.mapView.popup.watch('visible', v => this.clearPopup(v));

    this.clearPopup = visible => {
      if (visible) {
        return;
      }

      subscription.remove();
      this.clearPopup = noop;
      this.mapView.graphics.remove(point);
    };
  }

  private toActions(actions: string[]): Array<__esri.ActionButton | __esri.ActionToggle> {
    if (!actions || !Array.isArray(actions)) {
      return [];
    }

    return actions.map(action => this.actions[action]).filter(Boolean);
  }

  private destroyMap(): void {
    if (this.map && this.map.destroy) {
      this.map.destroy();

      this.map = null;
      this.mapView = null;
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
