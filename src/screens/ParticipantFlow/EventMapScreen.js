import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getEventCaches } from '../../api/geoquest';

const EventMapScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [caches, setCaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const setupMap = async () => {
      try {
        // 1. Get GPS Permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        // 2. Get User Location for the Map Center
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);

        // 3. Fetch Caches from API
        const data = await getEventCaches(eventId);
        setCaches(data);
      } catch (error) {
        console.error("Error setting up map:", error);
        Alert.alert("Error", "Could not load the event map. Did you type the correct Invite Code?");
      } finally {
        setIsLoading(false);
      }
    };

    setupMap();
  }, [eventId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Map & Caches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation?.latitude || 51.5074,
          longitude: userLocation?.longitude || -0.1278,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {caches.map((cache, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: cache.CacheLatitude, longitude: cache.CacheLongitude }}
            title={cache.CacheName}
            description={cache.CacheClue}
            onCalloutPress={() => navigation.navigate('LogDiscovery', { cache })}
          />
        ))}
      </MapView>
      <View style={styles.footer}>
        <Button title="View Leaderboard" onPress={() => navigation.navigate('Leaderboard')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '90%' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: { padding: 10, backgroundColor: 'white' }
});

export default EventMapScreen;