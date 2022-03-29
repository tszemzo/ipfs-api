import React from 'react'; 
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import TopBar from './components/TopBar';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';
import useToken from './utils';

import './App.css';

const App = () => {
  const { token, setToken } = useToken();

  return (
    <>
      <TopBar />
      <div className='main'>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                !!token 
                  ? <Dashboard />
                  : <Login setToken={setToken} />
              }
            />
            <Route 
              path="/login" 
              element={
                !!token
                  ? <Dashboard />
                  : <Login setToken={setToken} />
              }
            />
            <Route 
              path="/signup" 
              element={
                !!token
                  ? <Dashboard />
                  : <Signup />
              } 
            />
            <Route
              path="/dashboard"
              element={
                !!token 
                  ? <Dashboard /> 
                  : <Login setToken={setToken} />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
