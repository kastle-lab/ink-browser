import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

const Flow = ({bindings, data, setData}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
    const [selected, setSelected] = useState();

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

                setSelected(node.data.label)

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
                        onConnect={onConnect}
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
