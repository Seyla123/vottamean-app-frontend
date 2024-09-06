import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Divider,
    Box,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

/**
 * CardDetail Component
 *
 * This component renders a detailed card layout with dynamic content based on the props provided.
 * It includes a title, action buttons for editing and deleting, and a list of key-value pairs
 * displayed in a user-friendly format.
 *
 * Props:
 * - title (string): The title of the card, displayed at the top.
 * - description (string): Optional description that can be displayed below the title.
 * - onEdit (function): Function to be called when the edit button is clicked.
 * - onDelete (function): Function to be called when the delete button is clicked.
 * - ...otherProps (object): Any other props passed to the component will be displayed as key-value pairs.
 *
 * Example Usage:
 * ```
 * <CardDetail
 *   title="Class Period Information"
 *   classPeriodId="001"
 *   startTime="8:00 AM"
 *   endTime="9:30 AM"
 *   period="1h30min"
 *   onEdit={() => handleEdit()}
 *   onDelete={() => handleDelete()}
 * />
 * ```
 */

const customLabels = {
    classPeriodId: 'Class Period ID',
    startTime: 'Start Time',
    endTime: 'End Time',
    period: 'Period',
    subjectId: 'Subject ID',
    subjectName: 'Subject Name',
    description: 'Description',
};

const getLabel = key => {
    return customLabels[key] || key;
};

const CardDetail = ({
    title,
    description,
    onEdit,
    onDelete,
    ...otherProps
}) => {
    return (
        <Card>
            <CardHeader
                title={
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography variant='h6' fontWeight={600}>
                            {title}
                        </Typography>
                        <Box>
                            <IconButton
                                onClick={onEdit}
                                size='small'
                                color='primary'
                            >
                                <BorderColorIcon />
                            </IconButton>
                            <IconButton
                                onClick={onDelete}
                                size='small'
                                color='error'
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }
            />
            <Divider />
            <CardContent>
                {Object.entries(otherProps).map(([key, value]) => (
                    <Typography
                        key={key}
                        variant='body1'
                        color='text.secondary'
                    >
                        <strong>{getLabel(key)} :</strong> {value}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default CardDetail;
