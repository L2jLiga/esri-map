import { NgModule } from '@angular/core';
import { NgEsriMapComponent } from './ng-esri-map.component';

/**
 * Export all module methods required to correct work
 *
 * @publicApi
 */
@NgModule({
  imports: [],
  declarations: [NgEsriMapComponent],
  exports: [NgEsriMapComponent]
})
export class NgEsriMapModule {}
