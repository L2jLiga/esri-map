import { ILoadScriptOptions } from 'esri-loader';

const arcgisJsApi = 'https://js.arcgis.com/4.10';
export const loadOptions: ILoadScriptOptions = {
  url: `${arcgisJsApi}/init.js`,
  css: `${arcgisJsApi}/esri/css/main.css`,
  dojoConfig: {
    async: true
  }
};
