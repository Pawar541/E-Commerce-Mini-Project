import axios from 'axios';
const base = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';
const api = axios.create({ baseURL: base });

export function setAuthToken(token){
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default api;
