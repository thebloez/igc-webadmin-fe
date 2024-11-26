import { LatLngBoundsExpression, MapOptions } from 'leaflet';

// World bounds coordinates
const WORLD_BOUNDS: LatLngBoundsExpression = [
  [-90, -180], // Southwest coordinates
  [90, 180]    // Northeast coordinates
];

// Default map configuration to show entire world
export const worldMapConfig: MapOptions = {
  center: [0, 0],
  zoom: 1,
  // minZoom: 2,
  // maxZoom: 18,
  maxBounds: WORLD_BOUNDS,
  maxBoundsViscosity: 1.0,
  scrollWheelZoom: false,
  zoomControl: false
};

// Helper function to fit map to world bounds
export const fitToWorld = (map: L.Map): void => {
  map.fitBounds(WORLD_BOUNDS);
};