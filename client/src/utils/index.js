import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    return parsedToken ? parsedToken.token : null;
  };

  const [token, setToken] = useState(getToken());
  
  const saveToken = accessToken => {
    sessionStorage.setItem('token', accessToken);
    setToken(accessToken);
  };

  return {
    setToken: saveToken,
    token
  };
}