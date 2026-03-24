import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { createCache } from '../../api/geoquest';

const CreateCachesScreen = ({ navigation, route }) => {
  // Grab the eventId from navigation route params
  const eventId = route?.params?.eventId || 'unknown-event-id';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clue, setClue] = useState('');
  const [points, setPoints] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveCache = async () => {
    if (!name.trim() || !description.trim() || !clue.trim() || !points || !latitude || !longitude) {
      Alert.alert('Validation Error', 'Please fill out all fields before saving the cache.');
      return;
    }

    const parsedPoints = parseInt(points, 10);
    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    if (isNaN(parsedPoints) || isNaN(parsedLat) || isNaN(parsedLng)) {
      Alert.alert('Validation Error', 'Points and coordinates must be valid numbers.');
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
        CacheLatitude: parsedLat,
        CacheLongitude: parsedLng
      };

      await createCache(payload);
      
      Alert.alert('Success', 'Cache has been saved successfully!');
      
      // Clear form for the next cache entry
      setName('');
      setDescription('');
      setClue('');
      setPoints('');
      setLatitude('');
      setLongitude('');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the cache. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishEvent = () => {
    navigation.navigate('InviteCode', { eventId });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Add Caches</Text>
        <Text style={styles.subtitle}>Add hidden caches to Event: {eventId}</Text>

        <Text style={styles.label}>Cache Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Hidden treasure behind library"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Cache Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Provide context or history..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Cache Clue (Riddle)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter a riddle to help find the cache..."
          value={clue}
          onChangeText={setClue}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Cache Points</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 50"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., -27.470125"
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 153.021072"
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
        />

        <View style={styles.buttonGroup}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
          ) : (
            <>
              <View style={styles.primaryButton}>
                <Button title="Save This Cache" onPress={handleSaveCache} color="#28a745" />
              </View>
              <View style={styles.secondaryButton}>
                <Button title="Finish Event Creation" onPress={handleFinishEvent} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    marginBottom: 10,
  },
  secondaryButton: {
    marginTop: 10,
  }
});

export default CreateCachesScreen;
