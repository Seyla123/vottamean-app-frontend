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
    Chip,
    Avatar,
    Box,
    TablePagination,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    CheckCheckIcon,
    AlarmClockIcon,
    CircleX,
    PencilIcon,
} from 'lucide-react';
import { tableShadow } from '../../styles/global';
const AttendanceTable = ({
    rows,
    columns,
    status,
    hideColumns = [],
    onStatusChange,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);
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

    const handleStatusChange = newStatus => {
        if (selectedRow && onStatusChange) {
            onStatusChange(selectedRow, newStatus);
        }
        handleClose();
    };

    const truncate = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const visibleColumns = columns.filter(col =>
        isMobile ? !hideColumns.includes(col.id) : true
    );

    const statusColor = {
        Present: '#E0F5D7',
        Absent: '#FADBD8',
        Late: '#FFF3C7',
        Permission: '#D6EAF8',
    };

    const mobileStatusColor = {
        Present: '#7AC74F',
        Absent: '#E74C3C',
        Late: '#F4D03F',
        Permission: '#3498DB',
    };

    const statusIcon = {
        Present: <CheckCheckIcon size={16} color='green' />,
        Absent: <CircleX size={16} color='red' />,
        Late: <AlarmClockIcon size={16} color='orange' />,
        Permission: <PencilIcon size={16} color='blue' />,
    };

    const getStatusColor = status => statusColor[status];
    const getMobileStatusColor = status => mobileStatusColor[status];
    const getStatusIcon = status => statusIcon[status];
    const getStatusTextColor = status =>
        status === 'Present'
            ? 'green'
            : status === 'Absent'
              ? 'red'
              : status === 'Late'
                ? 'orange'
                : 'blue';

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ ...tableShadow }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {visibleColumns.map(column => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        width: column.id === 'id' ? '' : 'auto',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align='right'>Status / Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow key={index}>
                                    {visibleColumns.map(column => (
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
                                                truncate(row[column.id], 30)
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
                                            <Chip
                                                icon={getStatusIcon(row.status)}
                                                label={row.status}
                                                sx={{
                                                    backgroundColor:
                                                        getStatusColor(
                                                            row.status
                                                        ),
                                                    px: '4px',
                                                    color: getStatusTextColor(
                                                        row.status
                                                    ),
                                                }}
                                                size='small'
                                                style={{
                                                    marginRight: '8px',
                                                }}
                                            />

                                            <IconButton
                                                size='small'
                                                onClick={e =>
                                                    handleClick(e, row)
                                                }
                                            >
                                                <MoreVertIcon fontSize='small' />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {status.map(statusOption => (
                    <MenuItem
                        key={statusOption}
                        onClick={() => handleStatusChange(statusOption)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getStatusIcon(statusOption)}
                            <Box component='span' sx={{ ml: 1 }}>
                                {statusOption}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </Paper>
    );
};

export default AttendanceTable;
