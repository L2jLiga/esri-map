/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { ILoadScriptOptions } from 'esri-loader';

const baseUrl = 'https://js.arcgis.com';
export const _LOAD_OPTIONS: ILoadScriptOptions = {
  version: '4.15',
  get url() {
    return `${baseUrl}/${_LOAD_OPTIONS.version}/init.js`;
  },
  get css() {
    return `${baseUrl}/${_LOAD_OPTIONS.version}/esri/css/main.css`;
  },
  dojoConfig: {
    async: true
  }
};
