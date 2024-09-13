import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

function Focus({ dataFromType }) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: theme.spacing(1),
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

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 200px)', // Adjust based on your layout needs
  }));

  return (
    <div className='focus'>
      <Paper>
        <StyledTableContainer>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>affiliatedInstitution</StyledTableCell>
                <StyledTableCell>emailAddress</StyledTableCell>
                <StyledTableCell>familyName</StyledTableCell>
                <StyledTableCell>firstName</StyledTableCell>
                <StyledTableCell>roleString</StyledTableCell>
                <StyledTableCell>roleValue</StyledTableCell>
                <StyledTableCell>postDates</StyledTableCell>
                <StyledTableCell>publicationDate</StyledTableCell>
                <StyledTableCell>submissionDate</StyledTableCell>
                <StyledTableCell>publicationType</StyledTableCell>
                <StyledTableCell>title</StyledTableCell>
                <StyledTableCell>submittedBy</StyledTableCell>
                <StyledTableCell>field</StyledTableCell>
                <StyledTableCell>volumeNumber</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFromType && dataFromType.map((item) => (
                <StyledTableRow key={item.entries.emailAddress.value}>
                  <StyledTableCell>{item.entries.affiliatedInstitution.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.emailAddress.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.familyName.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.firstName.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.roleString.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.roleValue.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.postDates.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.publicationDate.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.submissionDate.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.publicationType.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.title.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.submittedBy.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.field.value}</StyledTableCell>
                  <StyledTableCell>{item.entries.volumeNumber.value}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </div>
  );
}

export default Focus;
