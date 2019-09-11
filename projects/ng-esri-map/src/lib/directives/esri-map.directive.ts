/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { isLoaded, loadScript } from 'esri-loader';
import { noop, ReplaySubject } from 'rxjs';
import {
  createBasemapsGallery,
  createHomeButton,
  createLayersList,
  createMap,
  createMapView,
  createPoint,
  createScaleBar
} from '../helpers';
import { HomeButtonProps, MapOptions, PointOptions, PopupOptions, ScaleBarProps } from '../models';
import { loadOptions } from '../registry';

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
 *   template: '<div #myMap='ngEsriMap' ngEsriMap></ng-esri-map>',
 *   styleUrls: ['./my-map.component.css']
 * })
 * export class MyMapComponent {
 *   @ViewChild('myMap') public myMap: EsriMapDirective;
 *
 *   public ngOnInit() {
 *     this.myMap.initMap({latitude: 1, longitude: 2});
 *   }
 * }
 * ```
 *
 * @publicApi
 */
@Directive({
  selector: '[ngEsriMap]',
  exportAs: 'ngEsriMap'
})
export class EsriMapDirective implements OnDestroy {
  public onRightClick: (event?: __esri.MapViewClickEvent) => void = noop;
  public onDoubleClick: (event?: __esri.MapViewClickEvent) => void = noop;
  public map: __esri.Map;
  public mapView: __esri.MapView;
  public mainGraphic: __esri.Graphic;
  public secondaryGraphic: __esri.Graphic;
  public mapInstance$: ReplaySubject<boolean> = new ReplaySubject();
  private actions: { [action: string]: __esri.ActionButton | __esri.ActionToggle } = {};
  private actionsListeners: { [action: string]: { remove: () => void } } = {};
  private clearPopup: (v?: boolean) => void = noop;

  constructor(private elRef: ElementRef) {
    if (!isLoaded()) {
      loadScript(loadOptions);
    }
  }

  public ngOnDestroy(): void {
    this.destroyMap();
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

    this.map = await createMap({
      basemap: 'streets'
    });

    this.mapView = await createMapView({
      container: this.elRef.nativeElement,
      map: this.map,
      zoom: zoom || 16,
      center: {longitude, latitude}
    });

    this.mapInstance$.next(true);

    this.initBasemapGallery().catch(noop);
    this.initLayersList().catch(noop);

    this.createMapListener('click', event => {
      if (event.button === 2) {
        this.onRightClick(event);
      }
    });
    this.createMapListener('double-click', event => this.onDoubleClick(event));

    if (options.scaleBar) {
      this.initScaleBar(options.scaleBarProps).catch(noop);
    }

    if (options.homeButton) {
      this.initHomeButton(options.homeButtonProps).catch(noop);
    }

    return this.mapView.when();
  }

  /**
   * @description
   * Puts main point on the map
   * Each new point created and added to map by this method will replace previously created.
   *
   * @publicApi
   */
  public async setMainPoint(options: PointOptions) {
    this.removeMainGraphic();

    this.mainGraphic = await this.createPoint(options);

    this.addGraphic(this.mainGraphic);
  }

  /**
   * @description
   * Removes main graphic from the map
   *
   * @publicApi
   */
  public removeMainGraphic() {
    this.removeGraphic(this.mainGraphic);

    this.mainGraphic = null;
  }

  /**
   * @description
   * Puts secondary point on the map
   * Each new point created and added to map by this method will replace previously created.
   *
   * @publicApi
   */
  public async setSecondaryGraphic(options: PointOptions) {
    this.removeSecondaryGraphic();

    this.secondaryGraphic = await this.createPoint(options);

    this.addGraphic(this.secondaryGraphic);
  }

  /**
   * @description
   * Removes secondary graphic from the map
   *
   * @publicApi
   */
  public removeSecondaryGraphic() {
    this.removeGraphic(this.secondaryGraphic);

    this.secondaryGraphic = null;
  }

  /**
   * @description
   * Creates point with given options
   *
   * @publicApi
   */
  public async createPoint(options: PointOptions) {
    const {latitude, longitude} = options;

    let popupTemplate: __esri.PopupTemplateProperties;
    if (options.popupTemplate) {
      popupTemplate = {
        title: options.popupTemplate.title,
        content: options.popupTemplate.content,
        actions: this.toActions(options.popupTemplate.actions)
      };
    }

    return await createPoint(latitude, longitude, popupTemplate);
  }

  /**
   * @description
   * Adds given graphic to the map if it created
   *
   * @publicApi
   */
  public addGraphic(graphic: __esri.Graphic) {
    if (this.mapView) {
      this.mapView.graphics.add(graphic);
    }
  }

  /**
   * Removes given graphic from the map
   *
   * @publicApi
   */
  public removeGraphic(graphic: __esri.Graphic) {
    if (this.mapView) {
      this.mapView.graphics.remove(graphic);
    }
  }
  /**
   * @description
   * Creates popup in given location with given title, content and actions list
   *
   * @publicApi
   */
  public async createPopup(options: PopupOptions) {
    this.clearPopup();

    const {latitude, longitude} = options.location;

    if (!options.actions) {
      options.actions = [];
    }

    const point = await createPoint(latitude, longitude, {
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
   * Creates actions which can be added to popup
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

    const scaleBar = await createScaleBar({
      ...props,
      view: this.mapView
    });

    this.addWidget(scaleBar, position);
  }

  private async initHomeButton(props: HomeButtonProps = {}) {
    const position = props.position || 'top-left';

    const homeButton = await createHomeButton({
      view: this.mapView,
      goToOverride: (view: __esri.MapView, params: __esri.GoToParameters) => {
        const scale = params.target.scale;
        let center = params.target.targetGeometry;

        if (this.mainGraphic) {
          center = this.mainGraphic.geometry;
        }

        // @ts-ignore
        return view.goTo({center, scale});
      },
      ...props
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

  private destroyMap(): void {
    if (this.mapView && this.mapView.destroy) {
      this.mapView.destroy();
    }
    if (this.mapView && this.map.destroy) {
      this.map.destroy();
    }

    this.mapInstance$.next(false);
  }

  private async initBasemapGallery(): Promise<void> {
    const bgExpand = await createBasemapsGallery({
      view: this.mapView
    }, {});

    this.addWidget(bgExpand, 'top-left');
  }

  private async initLayersList(): Promise<void> {
    const layerList = await createLayersList({
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
}
