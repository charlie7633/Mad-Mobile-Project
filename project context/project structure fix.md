# Task: Fix Project Structure and Restore Owner Flow Screens

**Role:** Expert React Native Developer.
**Context:** My Expo project is throwing a "Module not found" error for `geoquest.js` and the Metro Bundler cache is deeply confused. I need you to rebuild the file structure for my Owner Flow and guarantee the import paths are 100% correct.

**Task:** Please perform the following file updates and creations:

## 1. Rebuild the API File
Ensure there is a file located exactly at `/src/api/geoquest.js`. 
If it does not exist, create it. It must contain the `axios` setup using:
* `BASE_URL`: 'http://mark0s.com/geoquest/v1/api'
* `API_KEY`: 'zaur5u'
* Export functions for `getEvents`, `createEvent`, `getEventCaches`, and `createCache`.

## 2. Restore CreateEventScreen.js
Update `/src/screens/OwnerFlow/CreateEventScreen.js`. 
* Ensure the import path to `geoquest.js` exactly matches the actual file tree (e.g., `import { createEvent } from '../../api/geoquest';`).
* It must include the full React Native functional component: text inputs for Name and Description, `DateTimePicker` for start and finish times, and a Submit button.
* On successful submit, it must execute: `navigation.navigate('CreateCaches', { eventId: response.data.EventID });`

## 3. Restore CreateCachesScreen.js (Interactive Map Version)
Update `/src/screens/OwnerFlow/CreateCachesScreen.js`.
* Ensure the import path to `geoquest.js` matches the file tree.
* It must include `MapView` and `Marker` from `react-native-maps`. 
* The user taps the map to set the `CacheLatitude` and `CacheLongitude`.
* It requires text inputs for Name, Description, Clue, and Points.
* On finish, it must execute: `navigation.navigate('InviteCode', { eventId });`

**Execution:** Please analyze my current workspace, update these three files, and verify that the relative import paths between the `screens` folder and the `api` folder are mathematically correct so my app can finally compile.