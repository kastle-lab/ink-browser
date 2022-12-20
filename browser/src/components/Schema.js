import React from 'react';
import Flow from './Flow';

function Schema({bindings, setData}) {

    return (
        <div>
            <div className='flowDiv'>
                <Flow bindings={bindings} setData={setData}></Flow>
            </div>
        </div>
    )
}

export default Schema