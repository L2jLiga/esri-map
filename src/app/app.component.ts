import { Component } from '@angular/core';
import { NgEsriMapOptions } from '../../projects/ng-esri-map/src/lib/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mapOptions: NgEsriMapOptions = {
    point: {
      latitude: 48,
      longitude: 16
    },
    zoom: 16,
    layersOpacity: .5,
    featureLayers: [{
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/0'
    }]
  };
}
