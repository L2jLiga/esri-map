/// <reference types="arcgis-js-api" />
import { loadModules } from 'esri-loader';
import { HomeButtonProps, Layer, ScaleBarProps } from '../models';

export function createLayersList(properties?: __esri.LayerListProperties): Promise<__esri.LayerList> {
  return loadModules(['esri/widgets/LayerList'])
    .then(([LayerList]) => new LayerList(properties));
}

export function createMap(
  properties: __esri.MapProperties
): Promise<__esri.Map> {
  return loadModules(['esri/Map'])
    .then(([Map]) => new Map(properties));
}

export function createMapView(
  properties: __esri.MapViewProperties
): Promise<__esri.MapView> {
  return loadModules(['esri/views/MapView'])
    .then(([MapView]) => new MapView(properties));
}

export function createBasemapsGallery(
  galleryProperties: __esri.BasemapGalleryProperties,
  expandPropertis: __esri.ExpandProperties
): Promise<__esri.Expand> {
  return loadModules([
    'esri/widgets/Expand',
    'esri/widgets/BasemapGallery'
  ]).then(([Expand, BasemapGallery]) => {
    galleryProperties.container = document.createElement('div');
    const gallery = new BasemapGallery(galleryProperties);
    expandPropertis.content = gallery.domNode;

    return new Expand(expandPropertis);
  });
}

export function createGraphic(
  graphicProps?: __esri.GraphicProperties
): Promise<__esri.Graphic> {
  return loadModules(['esri/Graphic'])
    .then(([Graphic]) => new Graphic(graphicProps));
}

export function layerFromArcGISServerUrlParams(url: string, properties: any): Promise<__esri.Layer> {
  return loadModules(['esri/layers/Layer'])
    .then(([esriLayer]) => esriLayer.fromArcGISServerUrl({
      url,
      properties
    }));
}

export function createLayer<T extends __esri.Layer>(
  type: string,
  properties: Layer
): Promise<T> {
  return loadModules(['esri/layers/' + type])
    .then(([esriLayer]) => new esriLayer(properties));
}

export function createFeatureLayer(properties: Layer): Promise<__esri.FeatureLayer> {
  return createLayer('FeatureLayer', properties);
}

export function createImageryLayer(properties: Layer): Promise<__esri.ImageryLayer> {
  return createLayer('ImageryLayer', properties);
}

export function createMapImageLayer(properties: Layer): Promise<__esri.MapImageLayer> {
  return createLayer('MapImageLayer', properties);
}

export function createPoint(latitude: number,
                            longitude: number,
                            popupTemplate?: __esri.PopupTemplateProperties
): Promise<__esri.Graphic> {
  const geometry: any = {
    type: 'point', // autocasts as new Point()
    longitude,
    latitude
  };

  const symbol = {
    type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 2
    }
  };

  return createGraphic({
    geometry,
    symbol,
    popupTemplate
  });
}

export function createScaleBar(properties: ScaleBarProps): Promise<__esri.ScaleBar> {
  return loadModules(['esri/widgets/ScaleBar'])
    .then(([ScaleBar]) => new ScaleBar(properties));
}

export function createHomeButton(properties: HomeButtonProps): Promise<__esri.Home> {
  return loadModules(['esri/widgets/Home'])
    .then(([Home]) => new Home(properties));
}
