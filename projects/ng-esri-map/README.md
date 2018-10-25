# NgEsriMap component
Simple ESRI map component

## Usage

In template:
```html
<ng-esri-map [options]="options" (pointSelected)="onPointSelection($event)"></ng-esri-map>
```

In component:
```typescript
import { Component } from '@angular/core';
import { NgEsriMapOptions } from 'ng-esri-map';

@Component({
  selector: 'map-container',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  public mapOptions: NgEsriMapOptions = {
    point: {
      latitude: 48,
      longitude: 16
    }
  };

  public onPointSelection({latitude, longitude}): void {
    // Do some stuff....
  }
}
```

## Map options

   **point:** define point on a map
   
   ```json5
       {
         showPointOnMap: true,
         latitude: 48,
         longitude: 16,
         popupTemplate: null
       }
   ```

   A PopupTemplate formats and defines the content of a [Popup](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html) for a Point.

   [Read more about popup template...](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html)
       

   **allowPointSelection:** allow to setting point on a map

   boolean (default: true)
  
   **featureLayers:**: list of feature layers
   
   array (default: empty)
   
   ```json5
    [
      {
        title: 'Demo layer',
        url: 'https://your.server/MapServer'
      }
    ]
   ```
  
   **layersOpacity:** initial layers opacity
   
   number (default: 0.5)
  
   **zoom:** initial zoom

   number (default: 16)
