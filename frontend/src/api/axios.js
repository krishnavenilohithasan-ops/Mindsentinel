import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Maps perfectly to Node backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hook interceptors for JWT here when fully implemented
export default api;
