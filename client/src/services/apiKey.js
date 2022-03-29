import api from './api';

const includeToken = () => {
  const token = sessionStorage.getItem("token");
  return !!token ? { Authorization: `Bearer ${token}` } : null;
};

export function createKey() {
  return api.post('/key', {}, { 
    headers: includeToken()
  });
};

export function disableKey(id) {
  return api.post('/key/disable', { id }, { 
    headers: includeToken()
  });
};

export function getKeys() {
  return api.get('/key/all', { 
    headers: includeToken()
  });
};