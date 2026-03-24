import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const InviteCodeScreen = ({ navigation, route }) => {
  // Grab the eventId from navigation parameters
  const eventId = route?.params?.eventId || 'Unknown-Event-ID';

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(eventId);
      Alert.alert('Copied!', 'Invite code copied to clipboard. You can now share it.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to copy to clipboard.');
    }
  };

  const handleReturnToStart = () => {
    // Navigates back to the very first screen in the Owner Stack (CreateEventScreen)
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.celebratoryHeader}>🎉 Event Created! 🎉</Text>
      
      <Text style={styles.instructionText}>
        Your event and caches have been successfully saved. 
        Share the code below with your participants so they can join the hunt!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Your Invite Code:</Text>
        <Text style={styles.codeText}>{eventId}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.primaryButton}>
          <Button title="Copy Code" onPress={handleCopy} color="#007bff" />
        </View>
        <View style={styles.secondaryButton}>
          <Button title="Return to Start" onPress={handleReturnToStart} color="#6c757d" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebratoryHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    // additional style if needed
  }
});

export default InviteCodeScreen;
