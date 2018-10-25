import { FeatureLayers } from './feature-layer.interface';
import { Point } from './point.interface';

export interface NgEsriMapOptions {
  point: Point;
  customPoint?: {enabled?: boolean};
  featureLayers: FeatureLayers;
  zoom?: number;
  layersOpacity?: number;
}
