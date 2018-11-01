export interface PopupOptions {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  content: string;
  actions?: string[];
}
