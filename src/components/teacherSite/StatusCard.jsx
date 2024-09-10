import { Box, CardContent, Typography, Grid, Chip } from '@mui/material';
import {
    UsersIcon,
    CheckCheckIcon,
    AlarmClockIcon,
    CircleSlashIcon,
    PencilIcon,
} from 'lucide-react';
import { shadow } from '../../styles/global';

const StatusItem = ({ title, count, color, icon: Icon }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'start',
            gap: 2,
            ...shadow,
            width: 1,
            height: 1,
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            backgroundColor: 'white',
        }}
    >
        <Icon size={24} color={color} />
        <Box>
            <Typography variant='body2'>{title}</Typography>
            <Typography
                variant='body1'
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
            >
                {count}{' '}
                <Chip size='small' label='Students' variant='outlined' />
            </Typography>
        </Box>
    </Box>
);

const statusItems = [
    {
        title: 'Total Students',
        status: null,
        color: '#FFC107',
        icon: UsersIcon,
    },
    {
        title: 'Total Present',
        status: 'Present',
        color: '#4CAF50',
        icon: CheckCheckIcon,
    },
    {
        title: 'Total Absent',
        status: 'Absent',
        color: '#F44336',
        icon: CircleSlashIcon,
    },
    {
        title: 'Total Permission',
        status: 'Permission',
        color: '#3498DB',
        icon: PencilIcon,
    },
    {
        title: 'Total Late',
        status: 'Late',
        color: '#FF9800',
        icon: AlarmClockIcon,
    },
];

const StatusCard = ({ rows }) => {
    const getCounts = () => {
        const counts = {
            Total: rows.length,
            Present: 0,
            Absent: 0,
            Permission: 0,
            Late: 0,
        };

        rows.forEach(row => {
            if (row.status in counts) {
                counts[row.status]++;
            }
        });

        return counts;
    };

    const counts = getCounts();

    return (
        <Grid container spacing={1}>
            {statusItems.map((item, index) => (
                <Grid item xs={6} sm={4} md={4} lg={2} key={index}>
                    <StatusItem
                        title={item.title}
                        count={item.status ? counts[item.status] : counts.Total}
                        color={item.color}
                        icon={item.icon}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default StatusCard;
