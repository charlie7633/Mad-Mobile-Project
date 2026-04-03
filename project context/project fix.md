# Task: Fix 404 Error by Seeding Relational Data

**Context:** We are receiving a 404 Not Found error when POSTing to `/events`. According to our API Spec, an Event requires a valid `EventOwnerID` (mapped to a User entity) and `EventStatusID` (mapped to a Status entity). Because our database is wiped, these foreign keys don't exist.

**Task:** Update `src/api/geoquest.js` and `src/screens/OwnerFlow/CreateEventScreen.js` to automatically create a User and Status, and grab their fresh IDs *before* creating the Event.

## 1. Update `src/api/geoquest.js`
Leave the Axios `apiClient` setup exactly as it is, but add these two new export functions:
```javascript
export const createUser = async (userData) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const createStatus = async (statusData) => {
  const response = await apiClient.post('/status', statusData);
  return response.data;
};