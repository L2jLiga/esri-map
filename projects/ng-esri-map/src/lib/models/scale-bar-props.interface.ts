import ScaleBarProperties = __esri.ScaleBarProperties;

export interface ScaleBarProps extends ScaleBarProperties {
  unit?: 'non-metric' | 'metric' | 'dual';
  position?: string;
}
