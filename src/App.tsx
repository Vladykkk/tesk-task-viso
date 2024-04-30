import React, { useEffect } from "react";

import "./reset.css";

let map: google.maps.Map;
const center: google.maps.LatLngLiteral = {
  lat: 49.52315912602228,
  lng: 30.949206817026095,
};

async function initMap(): Promise<void> {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  map = new Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 6,
    mapId: "4504f8b37365c3d0",
  });

  const priceTag = document.createElement("div");
  priceTag.className = "price-tag";
  priceTag.textContent = "$2.5M";

  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: 49.52315912602228, lng: 30.949206817026095 },
    content: priceTag,
  });
}

const App: React.FC = () => {
  useEffect(() => {
    initMap();
  }, []); // Run once when component mounts

  return <div id="map" style={{ width: "100%", height: "600px" }}></div>;
};

export default App;
