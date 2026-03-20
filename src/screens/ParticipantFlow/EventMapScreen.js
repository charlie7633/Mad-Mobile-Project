import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EventMapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Map</Text>
      <Text style={styles.subtitle}>Map with specific event caches will appear here.</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Log a Discovery" 
          onPress={() => navigation.navigate('LogDiscovery')} 
        />
        <Button 
          title="View Leaderboard" 
          onPress={() => navigation.navigate('Leaderboard')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
    width: '100%',
    paddingHorizontal: 24,
  }
});

export default EventMapScreen;
