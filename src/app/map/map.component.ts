import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EsriMapDirective } from 'ng-esri-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('map') public map: EsriMapDirective;
  @Input() public set options(options) {
    this.init(options);
  }
  @Output() public pointSelected: EventEmitter<any> = new EventEmitter();

  public mapImageLayers = [
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
    }
  ];
  public featureLayers = [
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/0'
    },
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/1'
    },
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2'
    },
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3'
    },
  ];

  public async init({latitude, longitude, layers, scaleBar, homeButton}) {
    await this.map.initMap({
      latitude,
      longitude,
      scaleBar,
      scaleBarProps: {
        unit: 'metric'
      },
      homeButton
    });

    await this.map.setMainPoint({
      latitude,
      longitude,
      popupTemplate: {
        title: 'Point at...',
        content: `Lat: ${latitude}<br/>Lot: ${longitude}`,
        actions: ['select-point']
      }
    });

    this.createActions();

    this.map.onRightClick = event => this.showPopup(event.mapPoint);
  }

  private createActions() {
    this.map.createPopupAction('select-point', 'Select point', event => {
      // TODO: Why ESRI typing not fully correct?
      const {latitude, longitude} = (event as any).target.selectedFeature.geometry;

      this.pointSelected.emit({latitude, longitude});
    });
  }

  private async showPopup({latitude, longitude}) {
    return await this.map.createPopup({
      title: 'Point at...',
      content: `Lat: ${latitude}<br/>Lot: ${longitude}`,
      location: {
        latitude,
        longitude
      },
      actions: ['select-point'],
      showPointOnMap: true
    });
  }
}
