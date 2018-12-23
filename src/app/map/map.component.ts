import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgEsriMapComponent } from 'ng-esri-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('map') public map: NgEsriMapComponent;
  @Input() public set options(options) {
    this.buildMap(options);
  }
  @Input() public set layers(layers) {
    this.rebuildAllLayers(layers);
  }
  @Output() public pointSelected: EventEmitter<any> = new EventEmitter();

  public async buildMap({latitude, longitude, scaleBar, homeButton}) {
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

  private rebuildAllLayers(layers) {
    this.map.clearAllLayers();

    this.map.buildMapImageLayersList(layers);
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
