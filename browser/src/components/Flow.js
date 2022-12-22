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

    

    useEffect(() => {
        
        if (selected) {

            setData([])
            setTypeIsPending(true)

            async function engine() {

                const myEngine = new QueryEngine();

                const bindingsStream = await myEngine.queryBindings(`
                PREFIX kwg-ont: <http://stko-kwg.geog.ucsb.edu/lod/ontology/>
                select * where {
                ?s a kwg-ont:${selected} .
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

                // Consume results as an array (easier)
                let query = await(await bindingsStream.toArray())

                setData(query);

                setTypeIsPending(false)

            }

            engine()

        }

    }, [selected])

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
