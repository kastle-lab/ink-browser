import React from 'react';
import Flow from './Flow';

function Schema({bindings, data, setData}) {

    return (
        <div>
            <div className='flowDiv'>
                <Flow bindings={bindings} data={data} setData={setData}></Flow>
            </div>
        </div>
    )
}

export default Schema