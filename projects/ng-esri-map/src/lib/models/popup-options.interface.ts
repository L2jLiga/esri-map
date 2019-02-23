/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

export interface PopupOptions {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  content: string;
  actions?: string[];
  showPointOnMap: boolean;
}
