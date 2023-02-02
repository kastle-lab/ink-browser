import React from 'react'
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Type({ data, bindings, typeIsPending, setCoordinates, endpoint, setDataFromType }) {

  // Function is called when type data is clicked
  async function getPoint(e) {

    // Create query engine and run query
    const myEngine = new QueryEngine();
    let bindingsStream = await myEngine.queryBindings(`
    select * where {
    <${e.currentTarget.id}> ?p ?o.
    }`, {
      sources: [endpoint],
    });
    bindingsStream.on('error', (error) => {
      console.error(error);
    });

    // Converts the results to an array and set the data
    let query = (await bindingsStream.toArray())
    query = JSON.stringify(query)
    query = JSON.parse(query)
    setDataFromType(query)

    // Create variable to and if the item has geometry data set the variable
    let geometry = null;
    query && query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#hasGeometry") {
        geometry = item.entries.o.value;
      }
    })

    // If there is geometry data continue
    if (geometry != null) {

      // Query for specific geometry data
      bindingsStream = await myEngine.queryBindings(`
      select * where {
      <${geometry}> ?p ?o.
      }`, {
        sources: [endpoint],
      });
      bindingsStream.on('error', (error) => {
        console.error(error);
      });

      // Set the query with updated geometry data 
      query = (await bindingsStream.toArray())
      query = JSON.stringify(query)
      query = JSON.parse(query)

    }

    // Initialize variable to store the coordinates, parse out the corrdinates and set the coordinates
    let point = null;
    query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#asWKT") {
        point = item.entries.o.value;
        point = point.split("(").pop()
        point = point.substring(0, point.length - 1)
        point = point.split(' ')
        point = [point[1] * 1, point[0] * 1];
        setCoordinates(point)
      }
    })

  }

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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // console.log(data[0].entries._root.entries)
  
  return (

    <div className='type'>

      <Paper>
        <TableContainer className='table-container'>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {typeIsPending && <TableRow><TableCell>Gathering Data...</TableCell>
              <TableCell></TableCell></TableRow>}
              {data && !typeIsPending && data.length === 0 && <TableRow><TableCell>No data</TableCell><TableCell></TableCell></TableRow>}

              {data && data.map((entity) => (
                <StyledTableRow key={entity.entries._root.entries.length > 1 ? entity.entries._root.entries[1][1].id : entity.entries._root.entries[0][1].id}>


                  <StyledTableCell className='table-cell'>
                    <p id={entity.entries._root.entries.length > 1 ? entity.entries._root.entries[1][1].id : entity.entries._root.entries[0][1].id} onClick={getPoint}>{entity.entries._root.entries.length > 1 ? entity.entries._root.entries[0][1].id : "kwgr:" + (entity.entries._root.entries[0][1].id).split(".").pop()}</p>
                  </StyledTableCell>


                  <StyledTableCell className='table-cell'>
                    <a href={entity.entries._root.entries.length > 1 ? entity.entries._root.entries[1][1].id : entity.entries._root.entries[0][1].id} target='_blank' rel="noreferrer">
                      <IconButton size='small'>
                        <OpenInNewIcon fontSize='small'></OpenInNewIcon>
                      </IconButton>
                    </a>
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </div>
  )
}

export default Type