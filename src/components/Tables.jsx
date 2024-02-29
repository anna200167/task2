import React from 'react';
import { useTable,useFilters ,useSortBy} from 'react-table';
// import { useTable,  } from 'react-table';
import Table  from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { deleteRequest } from '../saga/actiontypes';
import {useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import EditForm from './EditForm';


const Tables = ({ columns, data }) => {
  const dispatch = useDispatch();

const handleDelete = async (itemId) => {
  try {
    // Dispatch the delete action
    await dispatch(deleteRequest(itemId));

    // Show a success toast
    toast.success('Item deleted successfully!', {
      position: 'top-right',
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    // Show an error toast
    toast.error('Error deleting item!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
}

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  },useFilters,useSortBy);
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} {...getTableProps()} style={{ border: '1px solid black',margin:'0 auto',padding:"12px", background: 'aliceblue'}}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: '1px solid black',
               background: 'aliceblue' }}>
                {column.render('Header')}
                  <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
              </TableCell>
              
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} style={{ borderBottom: '1px solid black' }}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ padding: '10px',borderBottom: '1px solid black' }}>
                  {cell.render('Cell')}
                </td>

              ))}
              <td>
                <Button color="error" variant="contained" onClick={() => handleDelete(`${row.original.id}`)}>
                  DELETE
                </Button>
              </td>
              <td>
                <EditForm id={row.original.id}/>
              </td>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    </TableContainer>
  );
};

export default Tables;
