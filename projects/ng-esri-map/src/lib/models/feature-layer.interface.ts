import { FeatureLayerOptions } from './feature-layer-options.interface';

export interface FeatureLayer extends FeatureLayerOptions {
  url: string;
  title?: string;
  id?: string;
}

export type FeatureLayers = FeatureLayer[];
