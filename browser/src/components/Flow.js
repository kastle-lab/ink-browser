import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, Controls, Background, MarkerType, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import customNode from './customNode';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const nodeTypes = { custom: customNode };

const Flow = ({ bindings, setData, setTypeIsPending, endpoint, connections, selected, setSelected }) => {

    // Initialize variables and state
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);

    function splitLabel(label) {
        if (typeof label === 'string' && (label.includes("/") || label.includes("#"))) {
            label = label.split("/").pop();
            label = label.split("#").pop();
        }
        return label;
    }

    function splitNodeCoordinates(x, y) {
        x = x.split("^^")[0];
        y = y.split("^^")[0];
        x = x.replace(/["]+/g, '');
        y = y.replace(/["]+/g, '');
        x = parseInt(x);
        y = parseInt(y);

        return [x, y];
    }

    const prepareNodes = useCallback(() => {
        let boxes = [];

        bindings && bindings.forEach((binding) => {
            let label = binding.entries._root.entries[2][1].id;

            // Handle literal or URI-based labels
            label = splitLabel(label);

            let x = binding.entries._root.entries[0][1].id;
            let y = binding.entries._root.entries[1][1].id;
            const coordinates = splitNodeCoordinates(x, y);
            x = coordinates[0];
            y = coordinates[1];

            boxes.push({
                id: label,
                type: 'custom',
                data: { label: label, link: binding.entries._root.entries[2][1].id, outgoing: {}, incoming: {} },
                position: { x: x, y: y },
                className: 'myNodes',
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            });
        });

        setNodes(boxes);
    }, [bindings, setNodes]);

    const removeJunkFromConnections = useCallback(() => {
        const removed = connections.replace(/["]+/g, '');
        const split = removed.split(/\r\n/);

        return split;
    }, [connections]);

    function calculateArrows(sourceNode, targetNode) {
        let sourceHandle;
        let targetHandle;

        if (sourceNode && targetNode) {
            if ((sourceNode.position.x - targetNode.position.x) <= 100 && sourceNode.position.y !== targetNode.position.y) {
                sourceHandle = "TopOut";
                targetHandle = "BottomIn";
            }

            if (sourceNode.position.y > targetNode.position.y && sourceNode.position.x === targetNode.position.x) {
                sourceHandle = "TopOut";
                targetHandle = "BottomIn";
            }

            if (sourceNode.position.y < targetNode.position.y && sourceNode.position.x === targetNode.position.x) {
                sourceHandle = "BottomOut";
                targetHandle = "TopIn";
            }

            if (sourceNode.position.x < targetNode.position.x) {
                sourceHandle = "RightOut";
                targetHandle = "LeftIn";
            }

            if ((sourceNode.position.y - targetNode.position.y) < -100) {
                sourceHandle = "LeftOut";
                targetHandle = "LeftIn";
            }

            if ((sourceNode.position.y - targetNode.position.y) <= -200 && (sourceNode.position.y - targetNode.position.y) >= -400) {
                sourceHandle = "LeftOut";
                targetHandle = "TopIn";
            }
        }

        return [sourceHandle, targetHandle];
    }

    const prepareEdges = useCallback(() => {
        let lines = [];

        if (connections) {
            const parsedConnections = removeJunkFromConnections();

            parsedConnections.forEach((connection) => {
                const split = connection.split(" ");

                let sourceNode;
                let targetNode;

                nodes.forEach((box) => {
                    if (split[0] === box.id) {
                        sourceNode = box;
                    }

                    if (split[2] === box.id) {
                        targetNode = box;
                    }
                });

                const handles = calculateArrows(sourceNode, targetNode);
                const sourceHandle = handles[0];
                const targetHandle = handles[1];

                lines.push({
                    id: connection,
                    source: split[0],
                    target: split[2],
                    sourceHandle: sourceHandle,
                    targetHandle: targetHandle,
                    label: split[1] !== 'subclass' ? split[1] : '',
                    markerEnd: {
                        type: split[1] !== 'subclass' ? MarkerType.ArrowClosed : MarkerType.Arrow,
                        width: 40,
                        height: 40,
                        color: '#000000',
                    },
                });

                setNodes(nodes);
            });

            setEdges(lines);
        }
    }, [connections, nodes, setNodes, removeJunkFromConnections, setEdges]);

    const queryClickedNode = useCallback(async () => {
        if (selected) {
            setData([]);
            setTypeIsPending(true);

            const myEngine = new QueryEngine();

            const bindingsStream = await myEngine.queryBindings(`
                prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX kastle-lab: <http://kastle-lab.org/>
                select * where {
                ?s a <${selected}> .
                OPTIONAL {?s rdfs:label ?label }
                }
               limit 200
               
               
                `, {
                sources: [endpoint],
            });

            bindingsStream.on('error', (error) => {
                console.error(error);
            });

            let query = await bindingsStream.toArray();

            setData(query);
            setTypeIsPending(false);
        }
    }, [endpoint, selected, setData, setTypeIsPending]);

    function selectionChange() {
        nodes.forEach((node) => {
            if (node.selected === true) {
                setSelected(node.data.link);
            }
        });
    }

    useEffect(() => {
        queryClickedNode();
    }, [selected, queryClickedNode]);

    useEffect(() => {
        prepareNodes();
        prepareEdges();
    }, [prepareEdges, prepareNodes]);

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
                        nodeTypes={nodeTypes}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default Flow;
