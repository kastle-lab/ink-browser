import { useEffect, useCallback } from 'react'

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function QueryEndpoint({ setBindings, endpoint, setConnections, setNodesIsPending }) {

    const queryForNodes = useCallback(async () => {

        const myEngine = new QueryEngine();

        // Create new query engine and query the endpoint for classes
        const bindingsStream = await myEngine.queryBindings(`
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX opla-sd: <http://ontologydesignpatterns.org/opla-sd#>
        select ?c ?x ?y where {
        ?c a owl:Class ;
        opla-sd:entityPosition ?eP .
        ?eP opla-sd:entityPositionX ?x .
        ?eP opla-sd:entityPositionY ?y .
        }`, {
            sources: [endpoint],
        });

        // Convery the query results to an array
        let query = await bindingsStream.toArray()

        console.log(query)

        // Set the data binding to the query results and set pending to false
        setBindings(query);

    }, [endpoint, setBindings])

    const queryForConnections = useCallback(async () => {

        const myEngine = new QueryEngine();

        // Query for connections
        const bindingsStream = await myEngine.queryBindings(`
        prefix opla-sd: <http://ontologydesignpatterns.org/opla-sd#>
        select ?connections where {
        ?ont opla-sd:hasConnections ?connections .
        }`, {
            sources: [endpoint],
        });

        let query = await bindingsStream.toArray()

        setConnections(query[0].entries._root.entries[0][1].id)

    }, [endpoint, setConnections])

    // Function that is called on button click
    const onSearch = useCallback(async () => {
        setNodesIsPending(true);
        await queryForNodes();
        await queryForConnections();
        setNodesIsPending(false)
    }, [queryForNodes, queryForConnections, setNodesIsPending])

    useEffect(() => {

        setBindings();
        setConnections();
        onSearch();
        
    }, [onSearch, endpoint, setBindings, setConnections])

}

export default QueryEndpoint