import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import ErrorBar from '../../components/ErrorBar';
import { signup } from '../../services/user';
import './Signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const validEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const validFields = () => validEmail() && !!password && password === passwordConfirmation;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(!validFields) return;
      await signup({ email, password });
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response
        ? err.response.data.message // Axios weird err response
        : err.message;
      setError(errorMsg);
    }
  }

  return (
    <div className="form">
      {error && (
        <ErrorBar 
          open={!!error}
          handleClose={() => setError(null)}
          message={error}
        />
      )}
      <div className="title">
        <Typography variant="h3" component="div">
          Signup
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email</label>
          <input type="text" name="email" onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="input-container">
          <label>Confirm Password</label>
          <input type="password" name="pass2" onChange={e => setPasswordConfirmation(e.target.value)} required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div>
        Already have an account? Log in <Link to='/login'>here.</Link>
      </div>
    </div>
  );
}

export default SignUp;
