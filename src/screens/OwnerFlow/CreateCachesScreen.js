import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CreateCachesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Caches</Text>
      <Text style={styles.subtitle}>Add GPS coordinates and clues to the event.</Text>
      <Button 
        title="Finish & Get Invite Code" 
        onPress={() => navigation.navigate('InviteCode')} 
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

export default CreateCachesScreen;
