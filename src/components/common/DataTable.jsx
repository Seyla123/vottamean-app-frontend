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
  ListItemIcon,
  ListItemText,
  MenuList,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import EmptyDataImage from '../../assets/images/empty-image.svg';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

import { FileText, Trash2, Pencil, EllipsisVertical } from 'lucide-react';
import { shadow } from '../../styles/global';

/**
 * DataTable Component
 *
 * A reusable and feature-rich table component built with React and Material-UI.
 *
 * Features:
 * - Sortable columns
 * - Pagination
 * - Row selection (single and multi-select)
 * - Responsive design with column hiding for mobile views
 * - Action menu for each row (edit and delete)
 * - Bulk delete functionality
 * - Empty state handling
 *
 * Props:
 * @param {Object[]} rows - Array of data objects to display in the table
 * @param {Object[]} columns - Array of column definitions (id, label, align)
 * @param {Function} onEdit - Callback function for row edit action
 * @param {Function} onDelete - Callback function for row delete action
 * @param {Function} onSelectedDelete - Callback function for bulk delete action
 * @param {string[]} hideColumns - Array of column ids to hide on mobile views
 * @param {string} emptyTitle - Title to display when the table is empty
 * @param {string} emptySubTitle - Subtitle to display when the table is empty
 *
 * Usage:
 * <DataTable
 *   rows={dataArray}
 *   columns={columnDefinitions}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 *   onSelectedDelete={handleBulkDelete}
 *   hideColumns={['columnToHide']}
 *   emptyTitle="No data available"
 *   emptySubTitle="Add some data to see it in the table"
 * />
 */

const DataTable = ({
  rows,
  columns,
  onEdit,
  onDelete,
  onView,
  onSelectedDelete,
  hideColumns,
  emptyTitle,
  emptySubTitle,
  showNO,
  isLoading = false,
}) => {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id || n.class_id);
      setSelected(newSelecteds);
      console.log('All rows selected:', newSelecteds);
    } else {
      setSelected([]);
      console.log('All rows deselected');
    }
  };

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

  const handleView = () => {
    if (onView) onView(menuRow);
    handleMenuClose();
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <TableContainer component={Paper} sx={shadow}>
      <Table className="min-w-full" aria-label="reusable table" size="small">
        <TableHead
          sx={{
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
            {showNO && <TableCell align="left">N/O</TableCell>}
            {columns.map((column) =>
              !isMobile || !hideColumns.includes(column.id) ? (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ) : null,
            )}
            {selected.length > 0 ? (
              <TableCell align="right" sx={{ maxWidth: '50px' }}>
                <Tooltip title="Delete selected">
                  <Button
                    onClick={handleSelectedDelete}
                    color="error"
                    startIcon={<Trash2 size={18} />}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </TableCell>
            ) : (
              <TableCell align="right"></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody sx={{ position: 'relative' }}>
          {isLoading ? (
            <LoadingTable columns={columns} />
          ) : rows.length === 0 ? (
            <EmptyTable
              columns={columns}
              emptyTitle={emptyTitle}
              emptySubTitle={emptySubTitle}
            />
          ) : (
            paginatedRows.map((row, index) => {
              const isItemSelected = isSelected(row.id || row.class_id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) =>
                    handleCheckboxClick(event, row.id || row.class_id)
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id || row.class_id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  {showNO && <TableCell>{index + 1}</TableCell>}
                  {columns.map((column) =>
                    !isMobile || !hideColumns.includes(column.id) ? (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {row[column.id]}
                      </TableCell>
                    ) : null,
                  )}
                  <TableCell align="right">
                    <IconButton onClick={(event) => handleMenuOpen(event, row)}>
                      <EllipsisVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      {!isLoading && rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      <Menu
        id="basic-menu"
        open={Boolean(anchorEl)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuList>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Pencil size={18} />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleView}>
            <ListItemIcon>
              <FileText size={18} />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete}>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <Trash2 size={18} />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={`${selected.length} selected item${selected.length > 1 ? 's' : ''}`}
      />
    </TableContainer>
  );
};

const EmptyTable = ({ columns, emptyTitle, emptySubTitle }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length + 2}
        sx={{
          height: '400px',
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
          <img
            src={EmptyDataImage}
            alt="empty"
            style={{
              width: '100%',
              maxWidth: '200px',
              objectFit: 'contain',
              marginBottom: '16px',
            }}
          />
          <Typography variant="h6" gutterBottom>
            {emptyTitle}
          </Typography>
          <Typography variant="body2">{emptySubTitle}</Typography>
        </div>
      </TableCell>
    </TableRow>
  );
};

const LoadingTable = ({ columns }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length + 2}
        sx={{
          height: '400px',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
};

export default DataTable;
