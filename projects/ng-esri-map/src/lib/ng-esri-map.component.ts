/// <reference types="arcgis-js-api" />
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { isLoaded, loadScript } from 'esri-loader';
import { EsriMapDirective } from './directives/esri-map.directive';
import { Layer, LayerOptions, Layers, MapOptions, PointOptions, PopupOptions } from './models';
import { loadOptions } from './registry';

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
    <div class="ngEsriMap"
         ngEsriMap
         #ngEsriMap='ngEsriMap'
         [ngEsriFeatureLayers]="featureLayers"
         [ngEsriImageryLayers]="imageryLayers"
         [ngEsriMapImageLayers]="mapImageLayers"
         [ngEsriArcGISServerLayers]="serverLayers"></div>`,
  styles: [`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      display: block;
    }

    div.ngEsriMap {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgEsriMapComponent implements AfterViewInit {
  public featureLayers: Layer[] = [];
  public imageryLayers: Layer[] = [];
  public mapImageLayers: Layer[] = [];
  public serverLayers: Layer[] = [];

  @ViewChild('ngEsriMap') private ngEsriMap: EsriMapDirective;

  public get onRightClick() {
    return this.ngEsriMap.onRightClick;
  }
  public set onRightClick(action: (event?: __esri.MapViewClickEvent) => void) {
    this.ngEsriMap.onRightClick = action;
  }

  public get onDoubleClick() {
    return this.ngEsriMap.onDoubleClick;
  }
  public set onDoubleClick(action: (event?: __esri.MapViewClickEvent) => void) {
    this.ngEsriMap.onDoubleClick = action;
  }

  public get map() {
    return this.ngEsriMap.map;
  }
  public get mapView() {
    return this.ngEsriMap.mapView;
  }
  public get secondaryGraphic() {
    return this.ngEsriMap.secondaryGraphic;
  }
  public get mainGraphic() {
    return this.ngEsriMap.mainGraphic;
  }

  constructor(private cdr: ChangeDetectorRef) {
    if (!isLoaded()) {
      loadScript(loadOptions);
    }
  }

  public ngAfterViewInit() {
    this.cdr.detach();
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
    layers.forEach(layer => this.serverLayers.push({...layer, ...options}));

    this.cdr.detectChanges();
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
    layers.forEach(layer => this.featureLayers.push({...layer, ...options}));

    this.cdr.detectChanges();
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
    layers.forEach(layer => this.imageryLayers.push({...layer, ...options}));

    this.cdr.detectChanges();
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
    layers.forEach(layer => this.mapImageLayers.push({...layer, ...options}));

    this.cdr.detectChanges();
  }

  /**
   * @description
   * Destroy all layers and remove them from the map
   *
   * @publicApi
   */
  public clearAllLayers() {
    this.serverLayers = [];
    this.featureLayers = [];
    this.imageryLayers = [];
    this.mapImageLayers = [];
  }

  /**
   * @description
   * Initialize base map with center in given coordinates
   *
   * @publicApi
   */
  public initMap(options: MapOptions): Promise<void> {
    return this.ngEsriMap.initMap(options);
  }

  /**
   * @description
   * Put main point on the map
   * BTW on map can exists only two points (just an restriction of current component)
   * Each usage of this method will replace previous one
   *
   * @publicApi
   */
  public setMainPoint(options: PointOptions) {
    return this.ngEsriMap.setMainPoint(options);
  }

  /**
   * @description
   * Remove main graphic from the map
   *
   * @publicApi
   */
  public removeMainGraphic() {
    return this.ngEsriMap.removeMainGraphic();
  }

  /**
   * @description
   * Put secondary point on the map
   * BTW on map can exists only two points (just an restriction of current component)
   * Each usage of this method will replace previous one
   *
   * @publicApi
   */
  public setSecondaryGraphic(options: PointOptions) {
    return this.ngEsriMap.setSecondaryGraphic(options);
  }

  /**
   * @description
   * Remove secondary graphic from the map
   *
   * @publicApi
   */
  public removeSecondaryGraphic() {
    return this.ngEsriMap.removeSecondaryGraphic();
  }

  /**
   * @description
   * Create popup in given location with given title, content and actions list
   *
   * @publicApi
   */
  public createPopup(options: PopupOptions) {
    return this.ngEsriMap.createPopup(options);
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
    return this.ngEsriMap.createPopupAction(id, title, callback);
  }
}
