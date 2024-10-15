import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
  Box,
  TablePagination,
  Typography,
  Checkbox,
  CircularProgress,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StatusChip from '../common/StatusChip';
import { truncate } from '../../utils/truncate';
import EmptyDataImage from '../../assets/images/empty-image.svg';
import StyledButton from './../common/StyledMuiButton';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

import { FileText, Trash2, Pencil, EllipsisVertical } from 'lucide-react';



const AttendanceListTable = ({
  rows,
  columns,
  hideColumns = [],
  handleView,
  handleDelete,
  onSelectedDelete,
  loading,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  totalRows,
  idField = 'attendanceId',
  onEdit
}) => {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));


  const handleSelectedDelete = () => {
    if (selected.length > 0) {
      setIsDeleteModalOpen(true);
    } else {
      console.log('No rows selected for deletion');
    }
  };

  const handleConfirmDelete = () => {
    if (onSelectedDelete) {
      console.log('Deleting selected rows:', selected);
      onSelectedDelete(selected);
      setSelected([]);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[idField]);
      setSelected(newSelecteds);
      console.log('All rows selected:', newSelecteds);
    } else {
      setSelected([]);
      console.log('All rows deselected');
    }
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log('Selected row ID:', id);
    console.log('Updated selected IDs:', newSelected);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuAction = (action) => {
    if (selectedRow) {
      action === 'view' ? handleView(selectedRow) : handleDelete(selectedRow.attendance_id);
      handleClose();
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleEdit = () => {
    if (onEdit && selectedRow) onEdit(selectedRow);
    handleMenuClose();
  };

  const visibleColumns = columns.filter((col) =>
    isMobile ? !hideColumns.includes(col.id) : true
  );

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const height = rowsPerPage === 5 ? '300px' : '700px';

  return (
    <Paper sx={{ boxShadow: 'none' }}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead sx={{ height: '60px' }}>
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
              {visibleColumns.map((column) => (
                <TableCell key={column.id} sx={{ width: column.id === 'id' ? '' : 'auto' }}>
                  {column.label}
                </TableCell>
              ))}
              {selected.length > 0 ? (
                <TableCell align="right" sx={{ maxWidth: '50px', paddingY: '0px' }}>
                  <StyledButton
                    onClick={handleSelectedDelete}
                    color="error"
                    startIcon={<Trash2 size={18} />}

                  />
                </TableCell>
              ) : (
                <TableCell align="right">Status / Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (<LoadingTable columns={visibleColumns} height={height} />
            ) : rows.length > 0 ? (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[idField]);
                const labelId = `enhanced-table-checkbox-${index}`;

                return <TableRow
                  hover
                  onClick={(event) => handleCheckboxClick(event, row[idField])}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'name' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={row.img} alt={`Avatar ${row.name}`} sx={{ width: 32, height: 32, marginRight: '8px', objectFit: 'cover' }} />
                          {row[column.id]}
                        </Box>
                      ) : column.id === 'id' ? (
                        row[column.id]
                      ) : (
                        truncate(row[column.id], 30)
                      )}
                    </TableCell>
                  ))}
                  <TableCell sx={{ width: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <StatusChip statusId={row.statusId} />
                      <IconButton size="small" onClick={(e) => handleClick(e, row)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>

              })) : <EmptyTable columns={visibleColumns} emptyTitle={'No Attendance Record'} emptySubTitle={'No Attendance Records Available'}></EmptyTable>}
          </TableBody>
        </Table>
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          itemName={`${selected.length} selected item${selected.length > 1 ? 's' : ''}`}
        />
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Pencil size={18} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('view')}>
          <ListItemIcon>
            <FileText size={18} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <Trash2 size={18} />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

const EmptyTable = ({ columns, emptyTitle, emptySubTitle }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length + 2}
        sx={{
          height: '600px',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box sx={{ width: '100%', height: '300px' }}>
            <img
              src={EmptyDataImage}
              alt="empty"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            {emptyTitle}
          </Typography>
          <Typography variant="body2">{emptySubTitle}</Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};
const LoadingTable = ({ columns, height }) => {

  return (
    <TableRow>
      <TableCell
        colSpan={columns.length + 2}
        sx={{
          height: height,
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};

export default AttendanceListTable;
