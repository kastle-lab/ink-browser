import React from 'react';
import Flow from './Flow';

function Schema({bindings, setData, setTypeIsPending, endpoint, connections, nodesIsPending}) {

    return (
        
        // Schema view with the react flow diagram in it
        <div className='flowDiv'>
            <Flow bindings={bindings} setData={setData} setTypeIsPending={setTypeIsPending} endpoint={endpoint} connections={connections}></Flow>
            {nodesIsPending && <h3 className='schema-pending'>Gathering Data...</h3>}
        </div>
        
    )
}

export default Schema