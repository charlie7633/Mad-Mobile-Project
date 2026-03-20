import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LogDiscoveryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Discovery</Text>
      <Text style={styles.subtitle}>Camera and GPS logic to log a cache find will go here.</Text>
      <Button 
        title="Submit Discovery" 
        onPress={() => navigation.goBack()} 
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
    textAlign: 'center',
  },
});

export default LogDiscoveryScreen;
