import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CreateEventScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Event</Text>
      <Text style={styles.subtitle}>Set time windows and event details here.</Text>
      <Button 
        title="Next: Add Caches" 
        onPress={() => navigation.navigate('CreateCaches')} 
      />
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
  },
});

export default CreateEventScreen;
