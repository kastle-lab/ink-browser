import React from 'react'
import { Handle, Position } from 'reactflow';

function customNode({data}) {

  return (
    <div className='customNode'>
      <Handle id="TopIn" type='target' position={Position.Top}/>
      <Handle id='TopOut' type='source' position={Position.Top} />
      <Handle id="RightIn" type='target' position={Position.Right} />
      <Handle id='RightOut' type='source' position={Position.Right} />
      <Handle id="BottomIn" type='target' position={Position.Bottom} />
      <Handle id='BottomOut' type='source' position={Position.Bottom} />
      <Handle id="LeftIn" type='target' position={Position.Left} />
      <Handle id='LeftOut' type='source' position={Position.Left} />
      {data && <p>{data.label}</p>}
    </div>
  )
}

export default customNode