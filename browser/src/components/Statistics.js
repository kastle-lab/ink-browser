import React from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('ak02115pjn6u', 159, 6.0, 24, 4.0),
    createData('ak02153n5s1', 237, 9.0, 37, 4.3),
    createData('ak021ib6xmj', 262, 16.0, 24, 6.0),
    createData('nn00792158', 305, 3.7, 67, 4.3),
    createData('pr2020359052', 356, 16.0, 49, 3.9),
    createData('pr2020359053', 374, 14.0, 51, 4.5),
    createData('pr2021024007', 361, 15.0, 29, 5,1),
];

function Statistics() {

  return (
    <div className='table-div'>
        <Paper>
            <TableContainer className='table-container'>
                <Table stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Earthquakes</StyledTableCell>
                            <StyledTableCell align="right">Depth</StyledTableCell>
                            <StyledTableCell align="right">Gap</StyledTableCell>
                            <StyledTableCell align="right">Error</StyledTableCell>
                            <StyledTableCell align="right">Mag</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
  )
}

export default Statistics