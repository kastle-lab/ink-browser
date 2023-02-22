import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function DataEndpoint({endpoint, setEndpoint}) {

  const [url, setUrl] = useState(endpoint);

  function setOnClick() {
    setEndpoint(url)
  }

  return (
    <>
    
      <p>Data Endpoint</p>
      <div className='endpoint'>
        <TextField
          size='small'
          style={{ width: 340 }}
          id="URL"
          label="URL"
          variant="outlined"
          required
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            localStorage.setItem('endpoint', e.target.value)
          }}
        />

        <Button onClick={setOnClick} variant="contained">Set Endpoint</Button>
      </div>
    </>
  )
}

export default DataEndpoint