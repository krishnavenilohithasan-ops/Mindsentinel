import axios from 'axios';

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000/api' 
    : 'https://mindsentinel-dashboard-1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hook interceptors for JWT here when fully implemented
export default api;
