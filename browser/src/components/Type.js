import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Type({ data, bindings, typeIsPending, setCoordinates, endpoint, setDataFromType, selected }) {

  // Function is called when type data is clicked
  async function getPoint(e) {
    const myEngine = new QueryEngine();
    let bindingsStream = await myEngine.queryBindings(`
      PREFIX kastle-lab: <http://kastle-lab.org/>
      SELECT * WHERE {
        <${e.currentTarget.id}> kastle-lab:affiliatedWithInstitution ?affiliatedInstitution.
        <${e.currentTarget.id}> kastle-lab:hasEmailAddress ?emailAddress .
        <${e.currentTarget.id}> kastle-lab:hasFamilyName ?familyName .
        <${e.currentTarget.id}> kastle-lab:hasFirstName ?firstName .
        <${e.currentTarget.id}> kastle-lab:performsRole ?roleString .
        BIND (IRI(CONCAT("http://kastle-lab.org/", ?roleString)) AS ?role) .
        ?role ?roleProperty ?roleValue .
        BIND (IRI(CONCAT("http://kastle-lab.org/", ?roleValue)) AS ?roles) .
        ?roles kastle-lab:dateOfPost ?postDates .
        ?roles kastle-lab:dateOfPublication ?publicationDate .
        ?roles kastle-lab:dateOfSubmission ?submissionDate .
        ?roles kastle-lab:hasAbstract ?abstract .
        ?roles kastle-lab:hasPublicationType ?publicationType .
        ?roles kastle-lab:hasSourcePublication ?sourcePublication .
        ?roles kastle-lab:hasTitle ?title .
        ?roles kastle-lab:publicationState ?publicationState .
        ?roles kastle-lab:submittedBy ?submittedBy .
        ?roles kastle-lab:associatedFieldOfStudy ?field .
        ?roles kastle-lab:hasVolumeNumber ?volumeNumber .
      }
    `, { sources: [endpoint] });
    
    bindingsStream.on('error', (error) => {
      console.error(error);
    });

    let query = (await bindingsStream.toArray());
    query = JSON.stringify(query);
    query = JSON.parse(query);
    setDataFromType(query);

    let geometry = null;
    query && query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#hasGeometry") {
        geometry = item.entries.affiliatedInstitution.value;
      }
    });

    if (geometry != null) {
      bindingsStream = await myEngine.queryBindings(`
        SELECT * WHERE {
          <${geometry}> ?p ?o.
        }
      `, { sources: [endpoint] });
      
      bindingsStream.on('error', (error) => {
        console.error(error);
      });

      query = (await bindingsStream.toArray());
      query = JSON.stringify(query);
      query = JSON.parse(query);
    }

    let point = null;
    query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#asWKT") {
        point = item.entries.affiliatedInstitution.value;
        point = point.split("(").pop();
        point = point.substring(0, point.length - 1);
        point = point.split(' ');
        point = [point[1] * 1, point[0] * 1];
        setCoordinates(point);
      }
    });
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
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className='type'>
      <Paper>
        <TableContainer className='table-container'>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Agent Names</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {typeIsPending && (
                <TableRow>
                  <StyledTableCell>Gathering Data...</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              )}
              {data && !typeIsPending && data.length === 0 && (
                <TableRow>
                  <StyledTableCell>No data</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              )}
              {data && data.map((entity) => (
                <StyledTableRow key={entity.entries._root.entries.length > 1 ? entity.entries._root.entries[1][1].id : entity.entries._root.entries[0][1].id}>
                  <StyledTableCell className='table-cell'>
                    <p id={entity.entries._root.entries.length > 1 ? entity.entries._root.entries[1][1].id : entity.entries._root.entries[0][1].id} onClick={getPoint}>
                      {entity.entries._root.entries.length > 1 ? entity.entries._root.entries[0][1].id : "kwgr:" + (entity.entries._root.entries[0][1].id).split(".").pop()}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell className='table-cell'>
                    {/* Removed the hyperlink and icon button */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Type;
