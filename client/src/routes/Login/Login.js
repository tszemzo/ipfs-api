import React, { useState } from 'react';

import ErrorBar from '../../components/ErrorBar';
import { login } from '../../services/user';

import './Login.css';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      setToken(data.accessToken);
    } catch (err) {
      const errorMsg = err.response
        ? err.response.data.message // Axios weird err response
        : err.message;
      setError(errorMsg);
    }
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <div className="form">
      {error && (
        <ErrorBar 
          open={!!error}
          handleClose={handleClose}
          message={error}
        />
      )}

     <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input type="text" name="email" onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}
