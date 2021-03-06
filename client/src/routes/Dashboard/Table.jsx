import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row, disableKey } = props;
  const [open, setOpen] = React.useState(false);

  const renderDisableButton = (id) => (
    <Button variant="contained" onClick={() => disableKey(id)}>
      Disable
    </Button>
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.id}</TableCell>
        <TableCell align="right">{row.disabled ? 'Yes' : 'No'}</TableCell>
        <TableCell align="right">{row.created}</TableCell>
        <TableCell align="right">{row.createdBy}</TableCell>
        <TableCell align="right">{row.disabled ? null : renderDisableButton(row.id)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Requests ({row.requests.length || 0 })
              </Typography>
              <Table size="small" aria-label="request-ids">
                <TableBody>
                  {row.requests.map((request) => (
                    <TableRow key={request}>
                      <TableCell component="th" scope="row">{request}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ rows, disableKey }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="right">Disabled</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} disableKey={disableKey} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
