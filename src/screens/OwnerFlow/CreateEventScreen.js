import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, ActivityIndicator, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createEvent, createUser, createStatus } from '../../api/geoquest';

const CreateEventScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date(Date.now() + 3600000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showFinishPicker, setShowFinishPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Event Name and Description cannot be empty.');
      return;
    }
    setIsLoading(true);
    try {
      // 1. Seed User and Status so we have valid foreign keys
      const userPayload = {
        UserFirstname: "Owner",
        UserLastname: "Test",
        UserPhone: "0000000000",
        UserUsername: "owner_" + Date.now(),
        UserPassword: "password",
        UserLatitude: 51.5,
        UserLongitude: -0.1,
        UserTimestamp: Date.now(),
        UserImageURL: "http://example.com/img.png"
      };
      const userRes = await createUser(userPayload);
      // Safely extract the new ID (handle depending on if Axios data is nested)
      const newUserId = userRes.UserID || userRes.data?.UserID || 1;

      const statusPayload = {
        StatusName: "planned",
        StatusOrder: 1
      };
      const statusRes = await createStatus(statusPayload);
      const newStatusId = statusRes.StatusID || statusRes.data?.StatusID || 1;

      const payload = {
        EventName: name,
        EventDescription: description,
        EventIspublic: isPublic, // lowercase p as per spec
        EventStart: startDate.toISOString(),
        EventFinish: finishDate.toISOString(),
        EventOwnerID: newUserId,
        EventStatusID: newStatusId
      };
      const response = await createEvent(payload);
      const newEventId = response.EventID || response.data?.EventID;
      
      Alert.alert('Success', 'Event Created Successfully!');
      navigation.navigate('CreateCaches', { eventId: newEventId });
    } catch (error) {
      console.error("Failed to create event:", error);
      Alert.alert('Error', 'Failed to communicate with the GeoQuest API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Event</Text>
      <TextInput style={styles.input} placeholder="Event Name" value={name} onChangeText={setName} />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Event Description" value={description} onChangeText={setDescription} multiline />
      <View style={styles.switchContainer}>
        <Text>Public Event?</Text>
        <Switch value={isPublic} onValueChange={setIsPublic} />
      </View>

      <View style={styles.dateContainer}>
        <Button title={`Start: ${startDate.toLocaleTimeString()}`} onPress={() => setShowStartPicker(true)} />
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="time"
            display="default"
            onValueChange={(event, date) => {
              setShowStartPicker(Platform.OS === 'ios');
              if (date) setStartDate(date);
            }}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <Button title={`Finish: ${finishDate.toLocaleTimeString()}`} onPress={() => setShowFinishPicker(true)} />
        {showFinishPicker && (
          <DateTimePicker
            value={finishDate}
            mode="time"
            display="default"
            onValueChange={(event, date) => {
              setShowFinishPicker(Platform.OS === 'ios');
              if (date) setFinishDate(date);
            }}
          />
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Create Event & Add Caches" onPress={handleSubmit} color="#007BFF" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#f9f9f9' },
  textArea: { height: 100, textAlignVertical: 'top' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  dateContainer: { marginBottom: 15 }
});

export default CreateEventScreen;