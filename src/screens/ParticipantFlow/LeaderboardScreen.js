import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import apiClient from '../../api/geoquest';

const LeaderboardScreen = ({ route }) => {
  const { EventID } = route.params;

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await apiClient.get('/finds');
      const eventFinds = response.data.filter(
        (find) => find.EventID === parseInt(EventID)
      );
      setPlayers(eventFinds);
    } catch (error) {
      console.log('Error fetching leaderboard:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>
        Participant progress and rankings
      </Text>

      <View style={styles.list}>
        {players.map((player, index) => (
          <Text key={index}>
            Player {player.FindPlayerID} - Cache {player.FindCacheID}
          </Text>
        ))}
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