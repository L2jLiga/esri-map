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
    actions?: string[]
  };
}
