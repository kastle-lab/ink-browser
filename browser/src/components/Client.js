import React from 'react'

function Client() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div>
        <h2 className='quad-head'>Client</h2>
      </div>
      <div>

      </div>
    </>
  )
}

export default Client