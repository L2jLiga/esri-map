/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { ArcGISServerLayersDirective } from './directives/arcgis-server-layers.directive';
import { BaseLayersDirective } from './directives/base-layers.directive';
import { EsriMapDirective } from './directives/esri-map.directive';
import { FeatureLayersDirective } from './directives/feature-layers.directive';
import { ImageryLayersDirective } from './directives/imagery-layers.directive';
import { MapImageLayersDirective } from './directives/map-image-layers.directive';
import { _LOAD_OPTIONS } from './registry';

/**
 * Export all module methods required to correct work
 *
 * @publicApi
 */
@NgModule({
  imports: [],
  declarations: [
    EsriMapDirective,
    ArcGISServerLayersDirective,
    FeatureLayersDirective,
    MapImageLayersDirective,
    ImageryLayersDirective,
  ],
  exports: [
    EsriMapDirective,
    ArcGISServerLayersDirective,
    FeatureLayersDirective,
    MapImageLayersDirective,
    ImageryLayersDirective,
  ],
})
export class NgEsriMapModule {
  static withArcGISVersion(version: string = '4.15'): ModuleWithProviders<NgEsriMapModule> {
    _LOAD_OPTIONS.version = version;

    return {
      ngModule: NgEsriMapModule,
    };
  }
}
