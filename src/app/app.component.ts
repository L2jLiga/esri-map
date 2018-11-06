import { Component, OnInit, ViewChild } from '@angular/core';
import { NgEsriMapComponent } from 'ng-esri-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('map') public map: NgEsriMapComponent;

  public async ngOnInit() {
    this.map.buildLayersFromUrl([{
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/0'
    }]);

    await this.map.initMap({
      latitude: 48.19094,
      longitude: 16.31815,
      scaleBar: true,
      homeButton: true
    });

    await this.map.setMainPoint({
      latitude: 48.19094,
      longitude: 16.31815,
      popupTemplate: {
        title: 'Point at...',
        content: `Lat: 48,19094<br/>Lot: 16,31815`,
        actions: ['select-point']
      }
    });

    this.map.createPopupAction('select-point', 'Select point', event => {
      // TODO: Why ESRI typing not fully correct?
      const {latitude, longitude} = (event as any).target.selectedFeature.geometry;

      console.log(latitude, longitude);
    });

    this.map.onRightClick = event => this.showPopup(event.mapPoint);
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
