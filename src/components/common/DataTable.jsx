import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  TablePagination,
  Typography,
} from '@mui/material';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMediaQuery } from '@mui/material';
import NotFoundIcon from '../../assets/images/not-found.jpg';

const DataTable = ({
  rows,
  columns,
  onEdit,
  onDelete,
  onSelectedDelete,
  hideColumns,
  emptyTitle,
  emptySubTitle,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
}) => {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSelectAllClick = (event) => {
    const newSelected = event.target.checked ? rows.map((n) => n.id) : [];
    setSelected(newSelected);
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id],
    );
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  const handleEdit = () => {
    if (onEdit && menuRow) onEdit(menuRow);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(menuRow);
    handleMenuClose();
  };

  const handleSelectedDelete = () => {
    if (onSelectedDelete) {
      const selectedData = rows.filter((row) => selected.includes(row.id));
      console.log('Selected data to delete:', selectedData);
      onSelectedDelete(selected);
    }
    setSelected([]);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: '0px 5px 10px rgba(0,0,0,0.05)' }}
    >
      <Table className="min-w-full" aria-label="reusable table">
        <TableHead
          sx={{
            bgcolor: '#F3F3F5',
            height: '80px',
          }}
        >
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < rows.length
                }
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {columns.map((column) =>
              !isMobile || !hideColumns.includes(column.id) ? (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ) : null,
            )}
            <TableCell align="right">
              {selected.length > 0 && (
                <Tooltip title="Delete selected">
                  <IconButton onClick={handleSelectedDelete} color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <EmptyTable
              columns={columns}
              emptyTitle={totalCount > 0 ? 'No items on this page' : emptyTitle}
              emptySubTitle={totalCount > 0 ? 'Try changing page or rows per page' : emptySubTitle}
            />
          ) : (
            rows.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow key={row.id} selected={isItemSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(event) => handleCheckboxClick(event, row.id)}
                    />
                  </TableCell>
                  {columns.map((column) =>
                    !isMobile || !hideColumns.includes(column.id) ? (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {row[column.id]}
                      </TableCell>
                    ) : null,
                  )}
                  <TableCell align="right">
                    <IconButton onClick={(event) => handleMenuOpen(event, row)}>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <Menu
        id="basic-menu"
        open={Boolean(anchorEl)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </TableContainer>
  );
};

const EmptyTable = ({ columns, emptyTitle, emptySubTitle }) => {
  return (
    <TableRow sx={{ width: 1, height: '500px' }}>
      <TableCell colSpan={columns.length + 1} align="center" width={1}>
        <img
          src={NotFoundIcon}
          alt="not found"
          style={{
            width: '100%',
            maxWidth: '400px',
            objectFit: 'contain',
          }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {emptyTitle}
        </Typography>
        <Typography variant="body2">{emptySubTitle}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default DataTable;