# NgEsriMap component
[![npm version](https://badge.fury.io/js/ng-esri-map.svg?colorB=brightgreen)](https://www.npmjs.com/package/ng-esri-map)
[![npm](https://img.shields.io/npm/dm/ng-esri-map.svg?colorB=brightgreen)](https://www.npmjs.com/package/ng-esri-map)
[![node](https://img.shields.io/node/v/ng-esri-map.svg?colorB=brightgreen)](https://www.npmjs.com/package/ng-esri-map)
[![Dependency Status](https://img.shields.io/david/L2jLiga/esri-map.svg)](https://david-dm.org/L2jLiga/esri-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/L2jLiga/esri-map/blob/master/LICENSE)

Easy to use component which helps to integrate and control ESRI map inside your Angular application

## Life example

You can find [here](https://l2jliga.github.io/esri-map)

## Basic usage

1. Import `NgEsriMapModule` inside your Application
1. Insert map component into template like this:
   ```html
   <div #myMap="ngEsriMap"
        ngEsriMap
        [ngEsriMapImageLayers]="layers"
   ></div>
   ```
1. Control map inside your component:
   ```typescript
   import { Component, ViewChild } from '@angular/core';
   import { EsriMapDirective, Layer } from 'ng-esri-map';
   
   @Component({
     selector: 'my-map',
     templateUrl: './my-map.component.html',
     styleUrls: ['./my-map.component.css']
   })
   export class MyMapComponent {
     public layers: Layer[] = [
       {
         url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
       }
     ];
     @ViewChild('myMap') private myMap: EsriMapDirective;

     public ngOnInit() {
       this.myMap.initMap({latitude: 1, longitude: 2});
     }
   }
   ```

## Advanced usage
You can find an [example](https://github.com/L2jLiga/esri-map/blob/master/src/app/app.component.ts)
