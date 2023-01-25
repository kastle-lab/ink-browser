import React from 'react'
import TextField from '@mui/material/TextField';

function DataEndpoint({endpoint, setEndpoint}) {
  return (
    <>
    
      <p>Data Endpoint</p>

      <TextField
        size='small'
        id="URL"
        label="URL"
        variant="outlined"
        required
        value={endpoint}
        onChange={(e) => {
          setEndpoint(e.target.value)
          localStorage.setItem('endpoint', e.target.value)
        }}
      />
    
    </>
  )
}

export default DataEndpoint