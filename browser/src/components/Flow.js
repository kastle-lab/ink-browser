import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
    Background,
    MarkerType,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import customNode from './customNode';
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

// Store as a string on one line
// Open end ones mean subclass of
// Leave annotation in the schema file
// 

const initialNodes = [{id: 'custom', type: 'custom', position: {x: 0, y: 0}}]
const nodeTypes = { custom: customNode };

const Flow = ({bindings, setData, setTypeIsPending, endpoint, connections}) => { 

    // Initialize variables and state
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
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

        bindings && bindings.forEach((binding) => {
            let label = binding.entries._root.entries[2][1].id
            label = label.split("/").pop()
            label = label.split("#").pop()

            let x = binding.entries._root.entries[0][1].id
            let y = binding.entries._root.entries[1][1].id
            x = x.split("^^")[0]
            y = y.split("^^")[0]
            x = x.replace(/["]+/g, '')
            y = y.replace(/["]+/g, '')
            x = parseInt(x)
            y = parseInt(y)

            boxes.push(
                {
                    id: label,
                    type: 'custom',
                    data: { label: label, link: binding.entries._root.entries[2][1].id, outgoing:{}, incoming:{}},
                    position: { x: x, y: y },
                    className: 'myNodes',
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                }
            )

        })
        setNodes(boxes)

        // Split up the connections string
        let lines = [];

        if (connections) {
            let replace = connections.replace(/["]+/g, '');
            let done = replace.split(/\r\n/);
            let parsedConnections = done;

            parsedConnections.forEach((connection) => {

                const split = connection.split(" ")

                let sourceNode;
                let targetNode;

                nodes.forEach((node) => {
                    if (split[0] === node.id) {
                        sourceNode = node;
                    }

                    if (split[2] === node.id) {
                        targetNode = node;
                    }
                })

                let sourceHandle;
                let targetHandle;

                if (sourceNode && targetNode) {

                    if ((sourceNode.position.x - targetNode.position.x) <= 100 && sourceNode.position.y !== targetNode.position.y) {
                        sourceHandle = "TopOut"
                        targetHandle = "BottomIn"
                    }

                    if ((sourceNode.position.x - targetNode.position.x) <= 100 && sourceNode.position.y !== targetNode.position.y) {
                        sourceHandle = "TopOut"
                        targetHandle = "BottomIn"
                    }

                    if (sourceNode.position.y > targetNode.position.y && sourceNode.position.x === targetNode.position.x) {
                        sourceHandle = "TopOut"
                        targetHandle = "BottomIn"
                    }

                    if (sourceNode.position.y < targetNode.position.y && sourceNode.position.x === targetNode.position.x) {
                        sourceHandle = "BottomOut"
                        targetHandle = "TopIn"
                    }

                    if (sourceNode.position.x < targetNode.position.x) {
                        sourceHandle = "RightOut"
                        targetHandle = "LeftIn"
                    }

                    if ((sourceNode.position.y - targetNode.position.y) < -100) {
                        sourceHandle = "LeftOut"
                        targetHandle = "LeftIn"
                    }

                    

                }

                lines.push(
                    {
                        id: connection,
                        source: split[0],
                        target: split[2],
                        sourceHandle: sourceHandle,
                        targetHandle: targetHandle,
                        label: split[1] !== 'subclass' ? split[1] : '',
                        animated: true,
                        // type: 'smoothstep',
                        markerEnd: {
                            type: split[1] !== 'subclass' ? MarkerType.ArrowClosed : MarkerType.Arrow,
                            width: 20,
                            height: 20,
                            color: '#FF0072',
                        },
                    }
                )
            })

            setEdges(lines)
            
        }

    }, [bindings, setNodes, connections, setEdges])

    // Called when a node is clicked on to figure out which is selected
    function selectionChange() {
        nodes.forEach((node) => {
            if (node.selected === true) {

                setSelected(node.data.link)

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
                        nodeTypes={nodeTypes}
                    >
                        <Background/>
                        {/* <MiniMap zoomable pannable nodeColor={'#999'} position={'top-right'}/> */}
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;
