/// <reference types="arcgis-js-api" />
import { loadModules } from 'esri-loader';
import { Layer } from '../models';

export async function createLayersList(properties?: __esri.LayerListProperties): Promise<__esri.LayerList> {
  const [LayerList] = await loadModules(['esri/widgets/LayerList']);

  return new LayerList(properties);
}

export async function createMap(
  props: __esri.MapProperties
): Promise<__esri.Map> {
  const [Map] = await loadModules([
    'esri/Map'
  ]);

  return new Map(props);
}

export async function createMapView(
  props: __esri.MapViewProperties
): Promise<__esri.MapView> {
  const [MapView] = await loadModules([
    'esri/views/MapView'
  ]);

  return new MapView(props);
}

export async function createBasemapsGallery(
  galleryProperties: __esri.BasemapGalleryProperties,
  expandPropertis: __esri.ExpandProperties
): Promise<__esri.Expand> {
  const [Expand, BasemapGallery] = await loadModules([
    'esri/widgets/Expand',
    'esri/widgets/BasemapGallery'
  ]);
  galleryProperties.container = document.createElement('div');
  const gallery = new BasemapGallery(galleryProperties);
  expandPropertis.content = gallery.domNode;

  return new Expand(expandPropertis);
}

export async function createGraphic(
  graphicProps?: __esri.GraphicProperties
): Promise<__esri.Graphic> {
  const [Graphic] = await loadModules([
    'esri/Graphic'
  ]);
  return new Graphic(graphicProps);
}

export async function findViewForLayer<TLayer extends __esri.Layer,
  TLayerView extends __esri.LayerView>(
  view: __esri.View,
  layer: TLayer
): Promise<TLayerView> {

  return (await view.whenLayerView(layer)) as TLayerView;
}

export async function layerFromArcGISServerUrlParams(url: string, properties: any): Promise<__esri.Layer> {
  const [esriLayer] = await loadModules([
    'esri/layers/Layer'
  ]);

  return esriLayer.fromArcGISServerUrl({
    url,
    properties
  });
}

export async function createLayer(
  type: string,
  props: Layer
): Promise<__esri.Layer> {
  const [AnyLayer] = await loadModules([
    'esri/layers/' + type
  ]);

  return new AnyLayer(props);
}

export async function createFeatureLayer(
  props: Layer
): Promise<__esri.Layer> {
    return await createLayer('FeatureLayer', props);
}

export async function createImageryLayer(
  props: Layer
): Promise<__esri.Layer> {
  return await createLayer('ImageryLayer', props);
}

export async function createMapImageLayer(
  props: Layer
): Promise<__esri.Layer> {
  return await createLayer('MapImageLayer', props);
}

export async function createPoint(latitude: number,
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

  return await createGraphic({
    geometry,
    symbol,
    popupTemplate
  });
}

