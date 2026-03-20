import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const InviteCodeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Invite Code</Text>
      <Text style={styles.code}>ABCD-1234</Text>
      <Text style={styles.subtitle}>Share this code with participants to join!</Text>
      <Button 
        title="Go Home" 
        onPress={() => navigation.popToTop()} 
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
    marginBottom: 16,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
});

export default InviteCodeScreen;
