import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Flow A (Owner) Screens
import CreateEventScreen from '../screens/OwnerFlow/CreateEventScreen';
import CreateCachesScreen from '../screens/OwnerFlow/CreateCachesScreen';
import InviteCodeScreen from '../screens/OwnerFlow/InviteCodeScreen';

// Import Flow B (Participant) Screens
import JoinEventScreen from '../screens/ParticipantFlow/JoinEventScreen';
import EventMapScreen from '../screens/ParticipantFlow/EventMapScreen';
import LogDiscoveryScreen from '../screens/ParticipantFlow/LogDiscoveryScreen';
import LeaderboardScreen from '../screens/ParticipantFlow/LeaderboardScreen';

// Home Selector Screen (To choose between flows for testing/development)
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>GeoQuest</Text>
    <Text style={styles.subtitle}>Choose your flow to begin working.</Text>
    
    <View style={styles.buttonContainer}>
      <Button 
        title="Owner Flow (Flow A)" 
        onPress={() => navigation.navigate('OwnerStack')} 
      />
      <View style={styles.spacer} />
      <Button 
        title="Participant Flow (Flow B)" 
        onPress={() => navigation.navigate('ParticipantStack')} 
      />
    </View>
  </View>
);

const Stack = createNativeStackNavigator();

// Flow A Stack
const OwnerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ title: 'Create Event' }} />
    <Stack.Screen name="CreateCaches" component={CreateCachesScreen} options={{ title: 'Add Caches' }} />
    <Stack.Screen name="InviteCode" component={InviteCodeScreen} options={{ title: 'Invite Code' }} />
  </Stack.Navigator>
);

// Flow B Stack
const ParticipantStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JoinEvent" component={JoinEventScreen} options={{ title: 'Join Event' }} />
    <Stack.Screen name="EventMap" component={EventMapScreen} options={{ title: 'Event Map' }} />
    <Stack.Screen name="LogDiscovery" component={LogDiscoveryScreen} options={{ title: 'Log Discovery' }} />
    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OwnerStack" component={OwnerStack} />
      <Stack.Screen name="ParticipantStack" component={ParticipantStack} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  buttonContainer: { width: '80%' },
  spacer: { height: 16 },
});

export default RootNavigator;
