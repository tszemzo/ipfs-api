import api from './api';

const includeToken = () => {
  const token = sessionStorage.getItem("token");
  return !!token ? { Authorization: `Bearer ${token}` } : null;
};

export async function createKey() {
  try {
    const response = await api.post('/key', {}, { 
      headers: includeToken()
    });
    return response.data;
  } catch(err) {
    console.error(err);
  };
};

export async function disableKey(id) {
  try {
    const response = await api.post('/key/disable', {
      id
    }, { 
      headers: includeToken()
    });
    return response.data;
  } catch(err) {
    console.error(err);
  };
};

export async function getKeys() {
  try {
    const response = await api.get('/key/all', { 
      headers: includeToken()
    });
    return response.data;
  } catch(err) {
    console.error(err);
  };
};