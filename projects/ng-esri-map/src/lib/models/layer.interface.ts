import { LayerOptions } from './layer-options.interface';

export interface Layer extends LayerOptions {
  url: string;
  title?: string;
  id?: string;
}

export type Layers = Layer[];
