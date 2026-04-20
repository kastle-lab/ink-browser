import React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

function ItemList({
  itemData,
  setItemDescriptionName,
  setItemDescriptionBody,
  setItemDescriptionReferences,
}) {
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="item-list">
      <Paper>
        <TableContainer className="table-container">
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Tooltip
                    title="Topics Extracted From the paused frame which modules are available under open-kg-curriculum"
                    arrow
                  >
                    Topics
                  </Tooltip>
                </StyledTableCell>
                {/* <StyledTableCell>Summary</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {itemData &&
                itemData.map((item) => (
                  <StyledTableRow
                    // key={item}
                    onClick={() => {
                      setItemDescriptionName(item.name);
                      setItemDescriptionBody(item.description);
                      setItemDescriptionReferences(item.references);
                    }}
                  >
                    <StyledTableCell className="table-cell">
                      {item.name}
                    </StyledTableCell>

                    {/* <StyledTableCell className='table-cell'>
                                        {item.summary}
                                    </StyledTableCell> */}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default ItemList;
