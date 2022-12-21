import React, { useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MiniMap,
    useOnSelectionChange,
} from 'reactflow';
import 'reactflow/dist/style.css';

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
                    className: 'myNodes'
                }
            )
            y+=50
        })
        setNodes(boxes)
    }, [bindings, setNodes])

    

    function selectionChange() {
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
                        onEdgesChange={onEdgesChange}
                        fitView
                        onSelectionChange={selectionChange}
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
