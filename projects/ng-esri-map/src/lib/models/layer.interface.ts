/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { LayerOptions } from './layer-options.interface';

export interface Layer extends LayerOptions {
  url: string;
  title?: string;
  id?: string;
}

export type Layers = Layer[];
