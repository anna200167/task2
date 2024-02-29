// api.js
import axios from 'axios';

// Create an Axios instance with a custom configuration
const api = axios.create({
  baseURL: 'https://650bc2aa47af3fd22f6676ec.mockapi.io/User', // Your base URL here
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
