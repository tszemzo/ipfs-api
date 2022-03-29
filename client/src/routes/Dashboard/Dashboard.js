import React, { Component } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import ErrorBar from '../../components/ErrorBar';
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
      .then(({ data: keys }) => {
        this.setState({ keys, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false })
      });  
  }
  
  disableApiKey = async (id) => {
    try {
      const keys = [...this.state.keys];
      const { data: disabledKey } = await disableKey(id);
      const index = keys.findIndex((key) => key.id === id)
      keys[index] = disabledKey;
      this.setState({ keys });
    } catch (err) {
      const errorMsg = err.response
        ? err.response.data.message
        : err.message;
      this.setState({ error: errorMsg })
    }    
  }

  createApiKey = async () => {
    try {
      const { data } = await createKey();
      const updatedKeys = [data, ...this.state.keys];
      this.setState({ keys: updatedKeys });
    } catch (err) {
      const errorMsg = err.response
        ? err.response.data.message
        : err.message;
      this.setState({ error: errorMsg })
    }
  };

  render() {
    const { error, loading, keys } = this.state;
    return (
      <div className="dashboard-container">
        {error && (
          <ErrorBar 
            open={!!error}
            handleClose={() => this.setState({ error: null })}
            message={error}
          />
        )}

        <div className="button-container">
          <Button variant="contained" onClick={this.createApiKey}>
            Create API key
          </Button>
        </div>
        {
          loading
            ? <CircularProgress />
            : <CollapsibleTable 
                rows={keys}
                disableKey={this.disableApiKey}
              />
        }        
      </div>
    );
  }
}