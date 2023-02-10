import React from 'react'
import { Handle, Position } from 'reactflow';

function customNode({data}) {

    console.log(data)

  return (
    <div className='customNode'>
        <Handle id="in" type='target' position={Position.Top} />
        <Handle id='out' type='source' position={Position.Top} />
        <Handle id="in" type='target' position={Position.Right} />
        <Handle id='out' type='source' position={Position.Right} />
        <Handle id="in" type='target' position={Position.Bottom} />
        <Handle id='out' type='source' position={Position.Bottom} />
        <Handle id="in" type='target' position={Position.Left} />
        <Handle id='out' type='source' position={Position.Left} />
        <p>{data.label}</p>
    </div>
  )
}

export default customNode