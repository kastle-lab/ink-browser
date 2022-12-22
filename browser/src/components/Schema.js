import React from 'react';
import Flow from './Flow';

function Schema({bindings, data, setData, setTypeIsPending}) {

    return (
        <div>
            <div className='flowDiv'>
                <Flow bindings={bindings} data={data} setData={setData} setTypeIsPending={setTypeIsPending}></Flow>
            </div>
        </div>
    )
}

export default Schema