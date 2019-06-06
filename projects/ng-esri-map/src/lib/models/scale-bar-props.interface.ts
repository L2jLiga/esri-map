/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

/// <reference types="arcgis-js-api" />
import ScaleBarProperties = __esri.ScaleBarProperties;

export interface ScaleBarProps extends ScaleBarProperties {
  unit?: 'non-metric' | 'metric' | 'dual';
  position?: string;
}
