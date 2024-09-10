import React from 'react';
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AttendanceTable = ({
    rows,
    columns,
    status,
    hideColumns = [],
    onStatusChange,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

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

    const visibleColumns = columns.filter(col => !hideColumns.includes(col));

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {visibleColumns.map(column => (
                            <TableCell key={column}>{column}</TableCell>
                        ))}
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {visibleColumns.map(column => (
                                <TableCell key={column}>
                                    {row[column]}
                                </TableCell>
                            ))}
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                                <IconButton onClick={e => handleClick(e, row)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
                        {statusOption}
                    </MenuItem>
                ))}
            </Menu>
        </TableContainer>
    );
};

export default AttendanceTable;
