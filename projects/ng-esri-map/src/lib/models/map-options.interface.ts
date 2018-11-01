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
}
