import React from 'react';
import Flow from './Flow';
import ReactFlow, { ReactFlowProvider } from 'reactflow';

function Schema() {

    return (
        <div>
            <h2>Schema</h2>
            <div className='flowDiv'>
                <Flow></Flow>
            </div>
        </div>
    )
}

export default Schema