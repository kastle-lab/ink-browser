import ReactFlow, { Controls, Background, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';

const edges = [{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' }];

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
        type: 'input',
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
    },
];

function Flow() {

    const [nodes, setNodes] = useState(initialNodes);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const [clicked, setClicked] = useState();

    const onNodeClick = () => {
        console.log('test');
    }

    return (
        <div style={{ height: '100%' }}>
            <ReactFlow 
                nodes={nodes}
                onNodeClick={onNodeClick}
                edges={edges}
                
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;