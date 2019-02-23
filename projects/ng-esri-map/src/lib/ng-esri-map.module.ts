/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { ArcGISServerLayersDirective } from './directives/arcgis-server-layers.directive';
import { EsriMapDirective } from './directives/esri-map.directive';
import { FeatureLayersDirective } from './directives/feature-layers.directive';
import { ImageryLayersDirective } from './directives/imagery-layers.directive';
import { MapImageLayersDirective } from './directives/map-image-layers.directive';
import { NgEsriMapComponent } from './ng-esri-map.component';

/**
 * Export all module methods required to correct work
 *
 * @publicApi
 */
@NgModule({
  imports: [],
  declarations: [
    NgEsriMapComponent,
    EsriMapDirective,
    ArcGISServerLayersDirective,
    FeatureLayersDirective,
    MapImageLayersDirective,
    ImageryLayersDirective
  ],
  exports: [
    NgEsriMapComponent,
    EsriMapDirective,
    ArcGISServerLayersDirective,
    FeatureLayersDirective,
    MapImageLayersDirective,
    ImageryLayersDirective
  ]
})
export class NgEsriMapModule {}
