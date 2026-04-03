# Task: Rewrite LogDiscoveryScreen.js

**Context:** The current `LogDiscoveryScreen.js` is a blank placeholder. We need to implement the mandatory hardware sensors for our university assignment. The user reaches this screen by tapping a map marker. The cache data is passed via `route.params.cache`.

**Task:** Replace the file with a functional screen that utilizes `expo-location` and `expo-camera`.

## Requirements:
1. **Distance Check (expo-location):** Read the user's current GPS location. Use a Haversine formula to calculate the distance between the user and the `cache.CacheLatitude` / `cache.CacheLongitude`. Display the distance in meters.
2. **Camera Sensor (expo-camera):** Include a button to "Take Photo Evidence" using the Expo Camera component. 
3. **Unlock Logic:** Only enable the final "Log this Find" button IF the user is within 50 meters of the cache AND they have taken a photo.
4. **Action:** When "Log this Find" is clicked, show a success Alert and use `navigation.goBack()` to return to the map.