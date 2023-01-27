import React from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

function Focus({dataFromType}) {

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

  return (
    <div className='focus'>

      <Paper>
        <TableContainer className='table-container'>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Predicate</StyledTableCell>
                <StyledTableCell>Object</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataFromType && dataFromType.map((item) => (
                <StyledTableRow key={item.entries.o.value}>

                  
                  <StyledTableCell className='table-cell'>
                    {item.entries.p.value}
                  </StyledTableCell>

                  
                  <StyledTableCell className='table-cell'>
                    {item.entries.o.value}
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

export default Focus