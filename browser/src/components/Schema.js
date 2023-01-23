import React from 'react';
import Flow from './Flow';

function Schema({bindings, data, setData, setTypeIsPending, endpoint}) {

    return (
        
        <div className='flowDiv'>
            <Flow bindings={bindings} data={data} setData={setData} setTypeIsPending={setTypeIsPending} endpoint={endpoint}></Flow>
        </div>
        
    )
}

export default Schema