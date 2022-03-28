import api from './api';

export async function login({ email, password }) {
  try {
    const response = await api.post('/user/signin', {
      email,
      password
    });
    return response.data;
  } catch(err) {
    // Throw the error and handle it on the components
    if (err.response) {
      console.error(err.response.data.message);
    }
  };
};

export async function signup({ email, password }) {
  try {
    const response = await api.post('/user/signup', {
      email,
      password
    });
    return response.data;
  } catch(err) {
    if (err.response) {
      console.error(err.response.data.message);
    }
  };
};
