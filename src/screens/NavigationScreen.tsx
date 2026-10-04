import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function NavigationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route guidance</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -33.8688,
          longitude: 151.2093,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude: -33.8688, longitude: 151.2093 }} title="Origin" />
        <Marker coordinate={{ latitude: -33.878, longitude: 151.216 }} title="Destination" />
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Start Quiet Route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Avoid Busy Roads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 12,
  },
  map: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  controls: {
    marginTop: 18,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#4FD1C5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#06202A',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 16,
  },
});
