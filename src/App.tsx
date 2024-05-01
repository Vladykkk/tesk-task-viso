import React, { useEffect } from "react";

import "./reset.css";

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

let map: google.maps.Map;
let markers: google.maps.Marker[] = [];

async function initMap(): Promise<void> {
  const ukraine: google.maps.LatLngLiteral = {
    lat: 49.52315912602228,
    lng: 30.949206817026095,
  };

  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;

  map = new Map(document.getElementById("map") as HTMLElement, {
    center: ukraine,
    zoom: 6,
    mapId: "6529720537f83a02",
  });

  map.addListener("click", (event: google.maps.MapMouseEvent) => {
    addMarker(event.latLng!);
  });

  document
    .getElementById("delete-markers")!
    .addEventListener("click", deleteMarkers);
}

function addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
  const marker = new google.maps.Marker({
    position,
    label: labels[labelIndex++ % labels.length],
    map,
    draggable: true,
  });

  marker.addListener("dragend", () => {
    const newPosition = marker.getPosition(); // Get the new position of the marker
    console.log("Marker dragged to:", newPosition.toString());
  });

  markers.push(marker);
}

function deleteMarkers(): void {
  markers.forEach((marker) => {
    marker.setMap(null);
  });

  markers = [];
}

const App: React.FC = () => {
  useEffect(() => {
    initMap();
  }, []);

  return (
    <>
      <input id="delete-markers" type="button" value="Delete Markers" />
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default App;
