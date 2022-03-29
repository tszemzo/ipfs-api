import api from './api';

export function login({ email, password }) {
  return api.post('/user/signin', {
    email,
    password
  });
};

export function signup({ email, password }) {
  return api.post('/user/signup', {
    email,
    password
  });
};
