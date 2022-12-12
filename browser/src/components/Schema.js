import React from 'react';
import Flow from './Flow';
import ReactFlow, { ReactFlowProvider } from 'reactflow';

function Schema({data, setData}) {

    return (
        <div>
            <div className='flowDiv'>
                <Flow data={data} setData={setData}></Flow>
            </div>
        </div>
    )
}

export default Schema