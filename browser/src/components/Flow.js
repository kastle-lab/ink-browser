import React, { useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: 'provider-1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
    },
    { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
    { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
    { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
    {
        id: 'provider-e1-2',
        source: 'provider-1',
        target: 'provider-2',
        animated: true,
    },
    { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3' },
];



const Flow = ({bindings, setData}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    
    useEffect(() => {
        let boxes = []
        let y = 0
        bindings && bindings.map((binding) => {
            let url = binding.entries._root.entries[0][1].id
            url = url.split("/").pop()
            url = url.split("#").pop()

            boxes.push(
                {
                    id: binding.entries._root.entries[0][1].id,
                    data: { label: url },
                    position: { x: 250, y: y },
                }
            )
            y+=75
        })
        setNodes(boxes)
    }, [bindings, setNodes])

    

    function nodeClick() {
        nodes.map((node) => {
            if (node.selected === true) {
                setData(node)
            }
        })
    }

    return (

        <div className="providerflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        fitView
                        onNodeClick={nodeClick}
                    >
                        <MiniMap zoomable pannable nodeColor={'#999'} position={'top-right'}/>
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;
