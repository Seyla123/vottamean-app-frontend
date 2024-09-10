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
    useMediaQuery,
    useTheme,
    Chip,
    Avatar,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    CheckCheckIcon,
    AlarmClockIcon,
    CircleX,
    PencilIcon,
} from 'lucide-react';

const AttendanceTable = ({
    rows,
    columns,
    status,
    hideColumns = [],
    onStatusChange,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const visibleColumns = columns.filter(col =>
        isMobile ? !hideColumns.includes(col.id) : true
    );

    const statusColor = {
        Present: '#E0F5D7',
        Absent: '#FADBD8',
        Late: '#FFF3C7',
        Permission: '#D6EAF8',
    };

    const statusIcon = {
        Present: <CheckCheckIcon size={16} color='green' />,
        Absent: <CircleX size={16} color='red' />,
        Late: <AlarmClockIcon size={16} color='orange' />,
        Permission: <PencilIcon size={16} color='blue' />,
    };

    const getStatusColor = status => statusColor[status];
    const getStatusIcon = status => statusIcon[status];
    const getStatusTextColor = status =>
        status === 'Present'
            ? 'green'
            : status === 'Absent'
              ? 'red'
              : status === 'Late'
                ? 'orange'
                : 'blue';

    return (
        <TableContainer component={Paper}>
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
                        <TableCell align='right' style={{ width: '200px' }}>
                            Status / Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {visibleColumns.map(column => (
                                <TableCell key={column.id}>
                                    {column.id === 'name' ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
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
                                    ) : (
                                        row[column.id]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell align='right' style={{ width: '140px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Chip
                                        icon={getStatusIcon(row.status)}
                                        label={row.status}
                                        sx={{
                                            backgroundColor: getStatusColor(
                                                row.status
                                            ),
                                            px: '4px',
                                            color: getStatusTextColor(
                                                row.status
                                            ),
                                        }}
                                        size='small'
                                        style={{ marginRight: '8px' }}
                                    />
                                    <IconButton
                                        size='small'
                                        onClick={e => handleClick(e, row)}
                                    >
                                        <MoreVertIcon fontSize='small' />
                                    </IconButton>
                                </div>
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
