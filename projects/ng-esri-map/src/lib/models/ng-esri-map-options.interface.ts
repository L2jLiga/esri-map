import { FeatureLayers } from './feature-layer.interface';

export interface NgEsriMapOptions {
  latitude: number;
  longitude: number;
  featureLayers: FeatureLayers;
  zoom?: number;
  layersOpacity?: number;
}
