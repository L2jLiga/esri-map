/**
 * @license
 * Copyright Andrey Chalkin. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/L2jLiga/esri-map/blob/master/LICENSE
 */

import { ILoadScriptOptions } from 'esri-loader';

const arcgisJsApi = 'https://js.arcgis.com/4.11';
export const loadOptions: ILoadScriptOptions = {
  url: `${arcgisJsApi}/init.js`,
  css: `${arcgisJsApi}/esri/css/main.css`,
  dojoConfig: {
    async: true
  }
};
