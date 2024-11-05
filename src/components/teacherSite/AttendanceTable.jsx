import { useState } from 'react';
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
  CircularProgress
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  CheckCheckIcon,
  AlarmClockIcon,
  CircleX,
  PencilIcon,
} from 'lucide-react';

import { tableShadow } from '../../styles/global';

import StatusChip from '../common/StatusChip';
import NotFoundImage from '../../assets/images/not-found.jpg';

const AttendanceTable = ({
  rows,
  columns,
  status,
  hideColumns = [],
  onStatusChange,
  isLoading,
  showNO
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'), {
    defaultMatches: true,
  });

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedRow && onStatusChange) {
      onStatusChange(selectedRow, newStatus);
    }
    handleClose();
  };

  const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const visibleColumns = columns.filter((col) =>
    isMobile ? !hideColumns.includes(col.id) : true,
  );

  const statusIcon = {
    present: <CheckCheckIcon size={16} color="green" />,
    absent: <CircleX size={16} color="red" />,
    late: <AlarmClockIcon size={16} color="orange" />,
    permission: <PencilIcon size={16} color="blue" />,
  };
  const getStatusIcon = (statusLabel) => statusIcon[statusLabel];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ ...tableShadow }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            {(showNO && !isMobile) && <TableCell align="left">No.</TableCell>}
              {visibleColumns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    width: column.id === 'id' ? '' : 'auto',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">Status / Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {(showNO && !isMobile) && <TableCell>{index + 1}</TableCell>}
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'name' ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 1,
                          }}
                        >
                          <Avatar
                            src={row.img}
                            alt={`Avatar ${row.name}`}
                            sx={{
                              width: 32,
                              height: 32,
                              marginRight: '8px',
                              objectFit: 'cover',
                            }}
                          />
                          {row[column.id]}
                        </div>
                      ) : column.id === 'id' ? (
                        row[column.id]
                      ) : (
                        truncate(row[column.id], 30) || 'N/A'
                      )}
                    </TableCell>
                  ))}
                  <TableCell sx={{ width: 'auto' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <StatusChip status='' statusId={row.status} />

                      <IconButton
                        size="small"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading ?  <LoadingTable columns={columns} height={'500px'} />: (rows.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              width: '100%',
            }}
          >
            <Box>
              <img
                src={NotFoundImage}
                alt="Not Found"
                width="400px"
                height="auto"
                style={{ objectFit: 'cover' }}
              />
              <Typography variant="h6" color="text.primary" textAlign="center">
                No student
              </Typography>
            </Box>
          </Box>
        ))}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {status.map((statusOption) => (
          <MenuItem
            key={statusOption.status_id}
            value={statusOption.status_id}
            onClick={() => handleStatusChange(statusOption.status_id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getStatusIcon(statusOption.status)}
              <Box component="span" sx={{ ml: 1}}>
                {statusOption.status}
              </Box>
            </Box>
          </MenuItem>
        ))}      </Menu>
    </Paper>
  );
};
const LoadingTable = ({ columns, height }) => {
  return (
      <Box
        colSpan={columns.length + 2}
        sx={{
          width:'100%',
          height: height,
          display:'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <CircularProgress />
      </Box>
  );
};

export default AttendanceTable;
