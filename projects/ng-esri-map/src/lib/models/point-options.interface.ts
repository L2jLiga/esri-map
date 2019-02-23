/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

export interface PointOptions {
  latitude: number;
  longitude: number;

  /**
   * A PopupTemplate formats and defines the content of a Popup for a Point.
   * @link https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
   */
  popupTemplate?: {
    title: string;
    content: string;
    actions?: string[];
  };
}
