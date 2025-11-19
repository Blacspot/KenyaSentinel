import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Colors } from '@/constants/Colors';
import { mockIncidents } from '@/data/mockData';
import WebMap from "@/components/WebMap";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [MapViewModule, setMapViewModule] = useState<any>(null);

  useEffect(() => {
    // Load map component only for native (iOS/Android)
    if (Platform.OS !== "web") {
      const loadMap = async () => {
        const mapModule = await import("react-native-maps");
        setMapViewModule(mapModule);
      };
      loadMap();
    }

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  if (loading || (Platform.OS !== "web" && !MapViewModule)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // ✅ Web version (Leaflet or similar in your WebMap)
  if (Platform.OS === "web") {
    return <WebMap />;
  }

  const MapView = MapViewModule.default;  
  const { Marker, PROVIDER_GOOGLE } = MapViewModule;  

  // ✅ Native version
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.coords.latitude ?? -0.0236,
          longitude: location?.coords.longitude ?? 37.9062,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {mockIncidents.map((incident) => (
          <Marker
            key={incident.id}
            coordinate={{
              latitude: -0.0236 + (Math.random() - 0.5) * 0.05,
              longitude: 37.9062 + (Math.random() - 0.5) * 0.05,
            }}
            title={incident.type}
            description={incident.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: { flex: 1 },
});
