import { ScaleBarProps } from './scale-bar-props.interface';

export interface MapOptions {
  /**
   * Latitude of map center
   */
  latitude: number;

  /**
   * Longitude of map center
   */
  longitude: number;

  /**
   * Setup default zoom when map initialized
   * default: 16
   */
  zoom?: number;

  /**
   * Scale bar displaying and props
   */
  scaleBar?: boolean;
  scaleBarProps?: ScaleBarProps;
}
