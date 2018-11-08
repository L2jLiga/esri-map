import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgEsriMapComponent } from 'ng-esri-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('map') public map: NgEsriMapComponent;
  @Input() public set options(options) {
    this.init(options);
  }
  @Output() public pointSelected: EventEmitter<any> = new EventEmitter();

  public async init({latitude, longitude, layers, scaleBar, homeButton}) {
    // @ts-ignore
    this.map.layers = [];
    this.map.buildMapImageLayersList(layers);

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
