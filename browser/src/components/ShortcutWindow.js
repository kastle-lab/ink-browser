import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function ShortcutWindow({ endpoint }) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    console.log("Fetching data...");
    console.log("Endpoint:", endpoint);
    console.log("SPARQL Query:", `
      PREFIX kastle-lab: <http://kastle-lab.org/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?lhsLabel ?middle0Label ?middle1Label ?rhsLabel 
      WHERE {
        ?lhs a kastle-lab:Agent ;
             rdfs:label ?lhsLabel .
        ?lhs kastle-lab:performsAgentRole ?middle0.
        ?middle0 rdfs:label ?middle0Label .
        ?lhs kastle-lab:performsAgentRole ?middle0.
        ?middle0 rdfs:label ?middle0Label .
        ?middle0 kastle-lab:hasTemporalExtent ?middle1.
        ?middle1 rdfs:label ?middle1Label .
        ?lhs kastle-lab:performsAgentRole ?middle0.
        ?middle0 rdfs:label ?middle0Label .
        ?middle0 ^kastle-lab:providesAgentRole ?rhs.
        ?rhs rdfs:label ?rhsLabel .
      }
    `);

    const fetchData = async () => {
      const myEngine = new QueryEngine();
      try {
        const bindingsStream = await myEngine.queryBindings(`
          PREFIX kastle-lab: <http://kastle-lab.org/>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

          SELECT ?lhsLabel ?middle0Label ?middle1Label ?rhsLabel 
          WHERE {
            ?lhs a kastle-lab:Agent ;
                 rdfs:label ?lhsLabel .
            ?lhs kastle-lab:performsAgentRole ?middle0.
            ?middle0 rdfs:label ?middle0Label .
            ?lhs kastle-lab:performsAgentRole ?middle0.
            ?middle0 rdfs:label ?middle0Label .
            ?middle0 kastle-lab:hasTemporalExtent ?middle1.
            ?middle1 rdfs:label ?middle1Label .
            ?lhs kastle-lab:performsAgentRole ?middle0.
            ?middle0 rdfs:label ?middle0Label .
            ?middle0 ^kastle-lab:providesAgentRole ?rhs.
            ?rhs rdfs:label ?rhsLabel .
          }`, {
          sources: [endpoint],
        });

        let queryResult = await bindingsStream.toArray();
        console.log("Query Result:", queryResult);
        setData(queryResult);
        setIsPending(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsPending(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className='shortcut'>
      <Paper>
        <TableContainer className='table-container'>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>lhsLabel</StyledTableCell>
                <StyledTableCell>middle0Label</StyledTableCell>
                <StyledTableCell>middle1Label</StyledTableCell>
                <StyledTableCell>rhsLabel</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isPending && <TableRow><StyledTableCell>Loading...</StyledTableCell></TableRow>}
              {!isPending && data.length === 0 && <TableRow><StyledTableCell>No data</StyledTableCell></TableRow>}
              {!isPending && data.map((triple, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{triple.lhsLabel?.value}</StyledTableCell>
                  <StyledTableCell>{triple.middle0Label?.value}</StyledTableCell>
                  <StyledTableCell>{triple.middle1Label?.value}</StyledTableCell>
                  <StyledTableCell>{triple.rhsLabel?.value}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ShortcutWindow;
