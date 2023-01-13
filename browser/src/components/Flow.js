import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    MiniMap,
    Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

const Flow = ({bindings, data, setData, setTypeIsPending}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
    const [selected, setSelected] = useState();

    // useEffect hook is called when the selected node changes
    useEffect(() => {
        
        if (selected) {

            // Data is set to empty and pending is set to true
            setData([])
            setTypeIsPending(true)

            // function for querying data when a node is clicked
            async function engine() {

                const myEngine = new QueryEngine();

                // Query that is ran
                const bindingsStream = await myEngine.queryBindings(`
                select * where {
                ?s a <${selected}> .
                }`, {
                    sources: ['http://localhost:3030/earthquake-usgs/'],
                });

                bindingsStream.on('data', (binding) => {
                    // console.log(binding); // Quick way to print bindings for testing
                });
                bindingsStream.on('end', () => {
                    // The data-listener will not be called anymore once we get here.
                });
                bindingsStream.on('error', (error) => {
                    console.error(error);
                });

                // Converts the results to an array
                let query = await(await bindingsStream.toArray())

                // Sets the data and sets pending to false
                setData(query);
                setTypeIsPending(false)

            }

            engine()

        }

    }, [selected])

    // Logic for setting up the node diagram
    useEffect(() => {
        let boxes = []
        let y = 0
        let x = 250
        let loop = 0

        bindings && bindings.map((binding) => {
            const div = Math.ceil(bindings.length / 3)
            let url = binding.entries._root.entries[0][1].id
            url = url.split("/").pop()
            url = url.split("#").pop()

            boxes.push(
                {
                    id: binding.entries._root.entries[0][1].id,
                    data: { label: url },
                    position: { x: x, y: y },
                    className: 'myNodes'
                }
            )
            y+=50
            loop++

            if (loop === div || loop === (div *2)) {
                x+=250
                y = 0
            }

        })
        setNodes(boxes)

    }, [bindings, setNodes])

    // Called when a node is clicked on
    function selectionChange() {
        nodes.map((node) => {
            if (node.selected === true) {

                setSelected(node.id)

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
                        <Background/>
                        <MiniMap zoomable pannable nodeColor={'#999'} position={'top-right'}/>
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;
