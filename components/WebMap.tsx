import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function WebMap() {
  const leafletHTML = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,width=device-width" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
    <style> #map { height: 100vh; width: 100vw; } </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script>
      const map = L.map('map').setView([0.3476, 32.5825], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

      // Example markers (you'll pass data later)
      L.marker([0.3476, 32.5825]).addTo(map).bindPopup("Example Marker");
    </script>
  </body>
  </html>
  `;

  return <WebView originWhitelist={["*"]} source={{ html: leafletHTML }} style={styles.map} />;
}

const styles = StyleSheet.create({ map: { flex: 1 } });
