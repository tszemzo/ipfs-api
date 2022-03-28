import React, { Component } from 'react';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { getKeys, disableKey, createKey } from '../../services/apiKey';
import CollapsibleTable from './Table';

import './Dashboard.css';

export default class Dashboard extends Component  {
  constructor() {
    super();
    this.state = {
      error: null,
      loading: false,
      keys: [],
    };
  }

  componentDidMount() {
    getKeys()
      .then(keys => {
        this.setState({ keys, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false })
      });  
  }
  
  disableApiKey = ev => {
    // Add disable button in the table
  }

  createApiKey = async () => {
    const newKey = await createKey();
    const updatedKeys = [newKey, ...this.state.keys];
    this.setState({ keys: updatedKeys });
  };

  render() {
    const { error, loading, keys } = this.state;
    if (error) {
      return <Alert severity="error">Error: {error.message || error}!</Alert>;
    };
    
    return (
      <div className="dashboard-container">
        <div className="button-container">
          <Button variant="contained" onClick={this.createApiKey}>
            Create API key
          </Button>
        </div>
        {
          loading
            ? <CircularProgress />
            : <CollapsibleTable rows={keys}/>
        }        
      </div>
    );
  }
}