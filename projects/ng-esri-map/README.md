# NgEsriMap component
Easy to use component which helps to integrate and control ESRI map inside your Angular application

## Basic usage

1. Import `NgEsriMapModule` inside your Application
1. Insert map component into template like this:
   ```html
   <ng-esri-map #myMap></ng-esri-map>
   ```
1. Control map inside your component:
   ```typescript
   import { Component, ViewChild } from '@angular/core';
   import { NgEsriMapComponent } from 'ng-esri-map';
   
   @Component({
     selector: 'my-map',
     templateUrl: './my-map.component.html',
     styleUrls: ['./my-map.component.css']
   })
   export class MyMapComponent {
     @ViewChild('myMap') public myMap: NgEsriMapComponent;

     public ngOnInit() {
       this.myMap.initMap({latitude: 1, longitude: 2});
     }
   }
   ```

## Advanced usage
You can find an [example](https://github.com/L2jLiga/esri-map/blob/master/src/app/app.component.ts)
