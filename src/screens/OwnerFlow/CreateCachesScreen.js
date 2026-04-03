import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createCache } from '../../api/geoquest';

const CreateCachesScreen = ({ navigation, route }) => {
  const eventId = route?.params?.eventId || 'unknown-event-id';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clue, setClue] = useState('');
  const [points, setPoints] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null); // Replaces manual lat/lng
  const [isLoading, setIsLoading] = useState(false);

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const handleSaveCache = async () => {
    if (!name.trim() || !description.trim() || !clue.trim() || !points || !selectedLocation) {
      Alert.alert('Validation Error', 'Please fill out all fields and tap the map to drop a pin.');
      return;
    }

    const parsedPoints = parseInt(points, 10);
    if (isNaN(parsedPoints)) {
      Alert.alert('Validation Error', 'Points must be a valid number.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        CacheName: name,
        CacheDescription: description,
        CacheEventID: eventId,
        CacheClue: clue,
        CachePoints: parsedPoints,
        CacheLatitude: selectedLocation.latitude,
        CacheLongitude: selectedLocation.longitude
      };

      await createCache(payload);
      Alert.alert('Success', 'Cache saved! Add another or finish.');

      // Reset form
      setName(''); setDescription(''); setClue(''); setPoints(''); setSelectedLocation(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the cache.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Add Caches to Event</Text>
        <Text style={styles.subtitle}>ID: {eventId}</Text>

        <Text style={styles.label}>Tap Map to Drop Cache Pin</Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{ latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
        </View>

        <TextInput style={styles.input} placeholder="Cache Name" value={name} onChangeText={setName} />
        <TextInput style={[styles.input, styles.multiline]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
        <TextInput style={[styles.input, styles.multiline]} placeholder="Clue / Riddle" value={clue} onChangeText={setClue} multiline />
        <TextInput style={styles.input} placeholder="Points (e.g. 50)" value={points} onChangeText={setPoints} keyboardType="numeric" />

        <View style={styles.buttonGroup}>
          {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
            <>
              <Button title="Save This Cache" onPress={handleSaveCache} color="#28a745" />
              <View style={{ marginTop: 10 }}><Button title="Finish Event Creation" onPress={() => navigation.navigate('InviteCode', { eventId })} /></View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  mapContainer: { height: 250, borderRadius: 8, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  map: { flex: 1 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#f9f9f9' },
  multiline: { height: 60, textAlignVertical: 'top' },
  buttonGroup: { marginTop: 10 }
});

export default CreateCachesScreen;