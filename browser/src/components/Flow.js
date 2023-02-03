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

// Store as a string on one line
// Open end ones mean subclass of
// Leave annotation in the schema file
// 

const Flow = ({bindings, setData, setTypeIsPending, endpoint, connections}) => { 

    // Initialize variables and state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
    const [selected, setSelected] = useState();

    // Split up the connections string
    useEffect(() => {
        let replace = connections.replace(/["]+/g, '')
        let done = replace.split(/\r\n/)
        console.log(done)
    }, [connections])

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
                prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                select * where {
                ?s a <${selected}> .
                OPTIONAL {?s rdfs:label ?label }
                }`, {
                    sources: [endpoint],
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

    }, [selected, endpoint, setData, setTypeIsPending])

    // Logic for setting up the node diagram
    useEffect(() => {
        let boxes = []
        let y = 0
        let x = 250
        let loop = 0

        bindings && bindings.forEach((binding) => {
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

    // Called when a node is clicked on to figure out which is selected
    function selectionChange() {
        nodes.forEach((node) => {
            if (node.selected === true) {

                setSelected(node.id)

            }

        })
    }

    return (

        // React flow Schema Diagram
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
