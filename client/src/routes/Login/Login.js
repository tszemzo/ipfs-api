import React, { useState } from 'react';
import { login } from '../../services/user';

import './Login.css';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async e => {
    e.preventDefault();
    const { accessToken } = await login({ email, password });
    setToken(accessToken);
  };

  return (
    <div className="form">
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
