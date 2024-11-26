import {
  MapContainer,
  Marker,
  ImageOverlay,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import worldMapSVG from "@assets/svg/map.svg"; // Path to your SVG file

interface IWorldMap {
  lat: number;
  lng: number;
}

// Fix marker icon issue
const CustomIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with any icon or keep it blank if not needed
  iconSize: [20, 20], // Reduced from [40, 40] to [20, 20]
  iconAnchor: [10, 20], // Adjusted anchor point to half of iconSize
});

const MapFitBounds = ({
  bounds,
}: {
  bounds: [[number, number], [number, number]];
}) => {
  const map = useMap();
  map.fitBounds(bounds, { padding: [20, 20] });
  return null;
};

const WorldMap = (props: IWorldMap) => {
  const svgBounds: [[number, number], [number, number]] = [
    [-74.5, -160], // Adjust bottom-left corner
    [90, 170], // Adjust top-right corner
  ];

  return (
    <MapContainer
      style={{
        height: "200px",
        width: "250px",
        backgroundColor: "transparent",
      }}
      zoom={5}
      attributionControl={false}
      dragging={false} // Disable dragging
      doubleClickZoom={false} // Disable zoom
      scrollWheelZoom={false} // Disable scroll
      zoomControl={false} // Disable zoom controls
    >
      {/* Fit map to bounds */}
      <MapFitBounds bounds={svgBounds} />

      {/* Add the SVG as an overlay */}
      <ImageOverlay url={worldMapSVG} bounds={svgBounds} />
      {/* Marker */}
      <Marker
        position={{
          lat: props.lat,
          lng: props.lng,
        }}
        icon={CustomIcon} // Use the custom marker icon
      >
        <Popup>'test'</Popup>
      </Marker>
    </MapContainer>
  );
};

export default WorldMap;
