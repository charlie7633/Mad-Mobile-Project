# Task: Build InviteCodeScreen.js (React Native / Expo)

**Role:** Expert React Native Developer.
**Context:** This is the final screen in the "Event Owner Flow" for the GeoQuest app. The Event and its Caches have successfully been saved to the database. The `eventId` has been passed to this screen via `route.params.eventId`.
**Task:** Create a simple, celebratory UI that displays the Event ID as an "Invite Code" for the user to share.

## 1. UI Requirements
Please build a clean, modern screen using functional components. The screen must include:
* **Success/Celebratory Text:** A header saying something like "Event Created Successfully!"
* **The Invite Code:** Display the `eventId` in a large, bold, highly visible text box or card. 
* **Instructions:** A small subtext telling the user to share this code with participants so they can join the hunt.

## 2. Interactive Elements
* **"Copy Code" Button:** A button that copies the `eventId` to the device's clipboard. (Please use `expo-clipboard` for this). Show a brief `Alert.alert` or toast confirming it was copied.
* **"Return to Start" Button:** A button that uses `navigation.popToTop()` (or navigates back to your initial start/home screen) so the user can create another event if they want to.

**Execution:** Please provide the full code for `/src/screens/OwnerFlow/InviteCodeScreen.js` and the terminal command to install `expo-clipboard` compatible with Expo SDK 54.