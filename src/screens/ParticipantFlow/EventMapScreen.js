import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import apiClient from '../../api/geoquest';

const EventMapScreen = ({ navigation, route }) => {
  const { EventID } = route.params;

  const [caches, setCaches] = useState([]);

  useEffect(() => {
    fetchCaches();
  }, []);

  const fetchCaches = async () => {
    try {
      const response = await apiClient.get(`/caches/events/${EventID}`);
      setCaches(response.data);
    } catch (error) {
      console.log('Error fetching caches:', error);
      console.log(response.data)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Map</Text>

      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {caches.map((cache) => (
          <Marker
            key={cache.CacheID}
            coordinate={{
              latitude: cache.CacheLatitude,
              longitude: cache.CacheLongitude,
            }}
            title={cache.CacheName}
            onPress={() =>
              navigation.navigate('LogDiscovery', {
                CacheID: cache.CacheID,
                CacheLatitude: cache.CacheLatitude,
                CacheLongitude: cache.CacheLongitude
              })
            }
          />
        ))}
      </MapView>

      <Text style={styles.subtitle}>
        Map with specific event caches will appear here.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="View Leaderboard"
          onPress={() => navigation.navigate('Leaderboard', {
            EventID: EventID
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // removed center alignment to fit map
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
    paddingHorizontal: 24,
  },
  map: {
    width: '100%',
    height: 300,
  }
});

export default EventMapScreen;