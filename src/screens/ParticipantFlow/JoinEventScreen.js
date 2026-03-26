import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const JoinEventScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleJoin = () => {
    if (code.trim() === '') {
      Alert.alert('Error', 'Please enter an invite code.');
      return;
    }

    navigation.navigate('EventMap', {
      EventID: code
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Event</Text>
      <Text style={styles.subtitle}>Enter the invite code from the event owner:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ABCD-1234"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
      />
      <Button title="Join Event" onPress={handleJoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default JoinEventScreen;
