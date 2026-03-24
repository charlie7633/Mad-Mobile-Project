import axios from 'axios';

const BASE_URL = 'http://mark0s.com/geoquest/v1/api';
const API_KEY = 'zaur5u';

// Configure Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// --- API Service Functions ---

// Get events
export const getEvents = async () => {
  const response = await apiClient.get('/events');
  return response.data;
};

// Create a new event
export const createEvent = async (eventData) => {
  const response = await apiClient.post('/events', eventData);
  return response.data;
};

// Get caches for a specific event
export const getEventCaches = async (eventId) => {
  const response = await apiClient.get(`/caches/events/${eventId}`);
  return response.data;
};

// Create a new cache
export const createCache = async (cacheData) => {
  const response = await apiClient.post('/caches', cacheData);
  return response.data;
};

export default apiClient;
