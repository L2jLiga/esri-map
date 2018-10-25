import { FeatureLayers } from './feature-layer.interface';
import { Point } from './point.interface';

export interface NgEsriMapOptions {
  point: Point;
  featureLayers: FeatureLayers;
  zoom?: number;
  layersOpacity?: number;
}
