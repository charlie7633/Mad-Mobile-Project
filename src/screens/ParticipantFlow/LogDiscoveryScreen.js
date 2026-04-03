import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Haversine formula to calculate distance in meters
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371e3; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const LogDiscoveryScreen = ({ route, navigation }) => {
  const { cache } = route.params;

  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [locationPerm, setLocationPerm] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPerm(status);
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      
      const dist = getDistance(
        loc.coords.latitude, 
        loc.coords.longitude, 
        // fallback in case latitude/longitude is not present, though assuming it is based on props
        cache.CacheLatitude, 
        cache.CacheLongitude
      );
      setDistance(dist);
    })();
  }, [cache]);

  const handleRefreshLocation = async () => {
    if (locationPerm !== 'granted') return;
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    const dist = getDistance(
      loc.coords.latitude, 
      loc.coords.longitude, 
      cache.CacheLatitude, 
      cache.CacheLongitude
    );
    setDistance(dist);
  };

  const handleTakePhotoEvidence = () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setShowCamera(false);
    }
  };

  const handleLogFind = () => {
    // Action: When "Log this Find" is clicked, show a success Alert and use navigation.goBack()
    Alert.alert('Success', 'You have successfully logged this find!');
    navigation.goBack();
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} facing="back">
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={() => setShowCamera(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Text style={styles.buttonText}>Capture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  const isWithinDistance = distance !== null && distance <= 50;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Discovery</Text>
      {cache?.CacheName && <Text style={styles.subtitle}>{cache.CacheName}</Text>}
      
      <View style={styles.section}>
        <Text style={styles.label}>Distance to Cache:</Text>
        {distance !== null ? (
          <Text style={styles.value}>{distance.toFixed(2)} meters</Text>
        ) : (
          <Text style={styles.value}>Calculating...</Text>
        )}
        <Button title="Refresh Location" onPress={handleRefreshLocation} />
      </View>

      <View style={styles.section}>
        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.image} />
            <Button title="Retake Photo Evidence" onPress={handleTakePhotoEvidence} />
          </>
        ) : (
          <Button title="Take Photo Evidence" onPress={handleTakePhotoEvidence} />
        )}
      </View>

      <View style={styles.logSection}>
        <Button 
          title="Log this Find" 
          onPress={handleLogFind} 
          disabled={!isWithinDistance || !photoUri}
        />
        {!isWithinDistance && distance !== null && (
          <Text style={styles.errorText}>You must be within 50 meters of the cache.</Text>
        )}
        {!photoUri && (
          <Text style={styles.errorText}>You must take photo evidence.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', justifyContent: 'center' },
  camera: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 20, textAlign: 'center' },
  section: { marginVertical: 15, alignItems: 'center' },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginVertical: 5 },
  image: { width: 200, height: 200, marginBottom: 10, borderRadius: 10 },
  logSection: { marginTop: 30, alignItems: 'center' },
  errorText: { color: 'red', marginTop: 5, textAlign: 'center' },
  buttonContainer: { 
    flex: 1, 
    backgroundColor: 'transparent', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    margin: 20, 
    alignItems: 'flex-end'
  },
  captureButton: { backgroundColor: 'white', padding: 15, borderRadius: 10, paddingHorizontal: 25 },
  buttonText: { fontSize: 18, color: 'black', fontWeight: 'bold' }
});

export default LogDiscoveryScreen;