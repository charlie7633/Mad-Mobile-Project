import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import apiClient from '../../api/geoquest';

const LogDiscoveryScreen = ({ navigation, route }) => {
  const { CacheID, CacheLatitude, CacheLongitude } = route.params;

  const [isNear, setIsNear] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    checkDistance(location.coords.latitude, location.coords.longitude);
  };

  const checkDistance = (userLat, userLng) => {
    const distance = Math.sqrt(
      Math.pow(userLat - CacheLatitude, 2) +
      Math.pow(userLng - CacheLongitude, 2)
    );

    if (distance < 0.001) {
      setIsNear(true);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const submitDiscovery = async () => {
    try {
      await apiClient.post('/finds', {
        FindCacheID: CacheID,
        FindPlayerID: 1,
        FindDatetime: new Date().toISOString()
      });

      Alert.alert('Success', 'Discovery logged!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error submitting discovery');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Discovery</Text>

      <Text style={styles.subtitle}>
        {isNear ? 'You are near the cache ✅' : 'Move closer to the cache ❌'}
      </Text>

      <Button title="Take Photo" onPress={takePhoto} />

      {photo && (
        <Image source={{ uri: photo }} style={styles.image} />
      )}

      <Button
        title="Submit Discovery"
        onPress={submitDiscovery}
        disabled={!isNear || !photo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // removed center alignment for better layout
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default LogDiscoveryScreen;