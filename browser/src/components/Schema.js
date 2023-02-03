import React from 'react';
import Flow from './Flow';

function Schema({bindings, setData, setTypeIsPending, endpoint, connections}) {

    return (
        
        // Schema view with the react flow diagram in it
        <div className='flowDiv'>
            <Flow bindings={bindings} setData={setData} setTypeIsPending={setTypeIsPending} endpoint={endpoint} connections={connections}></Flow>
        </div>
        
    )
}

export default Schema