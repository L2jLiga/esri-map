/// <reference types="arcgis-js-api" />
import { loadModules } from 'esri-loader';

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
  const map = new Map(props);
  return map;
}

export async function createMapView(
  props: __esri.MapViewProperties
): Promise<__esri.MapView> {
  const [MapView] = await loadModules([
    'esri/views/MapView'
  ]);
  const view: __esri.MapView = new MapView(props);
  return view;
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
  const expand = new Expand(expandPropertis);
  return expand;
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
  const layerView = (await view.whenLayerView(layer)) as TLayerView;
  return layerView;
}

export async function createFeatureLayer(
  props: __esri.FeatureLayerProperties
): Promise<__esri.FeatureLayer> {
  const [FeatureLayer] = await loadModules([
    'esri/layers/FeatureLayer'
  ]);
  const layer: __esri.FeatureLayer = new FeatureLayer(props);
  return layer;
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

