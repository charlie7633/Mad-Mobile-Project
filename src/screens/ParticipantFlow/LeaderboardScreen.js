import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>Participant progress and rankings will be shown here.</Text>
      {/* List placeholder */}
      <View style={styles.list}>
        <Text>1. Player123 - 5 Caches</Text>
        <Text>2. Anna - 3 Caches</Text>
        <Text>3. Mark - 2 Caches</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  list: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    gap: 8,
  }
});

export default LeaderboardScreen;
