import { useGetAttendanceQuery, useUpdateAttendanceMutation } from "../../services/attendanceApi";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/slices/uiSlice";
import { useEffect, useState } from "react";
import { BootstrapDialog } from "../common/BootstrapDialog";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Stack,
    Typography,
    Box,
    MenuItem,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { X } from 'lucide-react';
import { transformAttendanceForUpdate } from '../../utils/formatData';
import StyledButton from "../common/StyledMuiButton";
const fields = [
    {
        name: 'studentName',
        label: 'Student Name',
        icon: '',
    },
    {
        name: 'teacherName',
        label: 'Teacher Name',
        icon: '',
    },
    {
        name: 'subjectName',
        label: 'Subject Name',
        icon: '',
    },
    {
        name: 'className',
        label: 'Class Name',
        icon: '',
    },
    {
        name: 'statusId',
        label: 'Status',
        required: true,
        icon: '',
    },
    {
        name: 'time',
        label: 'time',
        icon: '',
    }, {
        name: 'date',
        label: 'date',
        icon: '',
    },

];
const options = [
    { value: 1, label: 'Present' },
    { value: 2, label: 'Late' },
    { value: 3, label: 'Absent' },
    { value: 4, label: 'Permission' },
];
const EditAttendanceModal = ({
    open,
    onClose,
    id
}) => {
    // data: data from Redux store of the record to be edited
    // isLoading: boolean indicating if the data is still being fetched
    // skip: if the id is not provided, skip the query
    const { data, isLoading, isSuccess } = useGetAttendanceQuery(id, { skip: !id || !open });

    // initialData: the initial values of the form fields
    // it is used to check if there are any changes made to the form
    const [initialData, setInitialData] = useState([]);

    const [status, setStatus] = useState(1);

    const dispatch = useDispatch();

    // useUpdateDataMutation : returns a function to update data from props
    const [
        updateData,
        {
            isLoading: isUpdating,
            isError: isUpdateError,
            isSuccess: isUpdatedSuccess,
            error: updateError,
        },
    ] = useUpdateAttendanceMutation();

    //when data is fetched, set the initial data for the form
    useEffect(() => {
        if (data) {
            const attendanceDetail = transformAttendanceForUpdate(data?.data);
            setInitialData(attendanceDetail);
            setStatus(data?.data?.status_id);
        }
    }, [isSuccess, data])

    // when update is failed, show a snackbar with an error message
    // when update is successful, show a snackbar with a success message
    useEffect(() => {
        if (isUpdateError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: updateError?.data?.message || 'Failed to update',
                    severity: 'error',
                }),
            );
            onClose();
        } else if (isUpdatedSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: 'Update successfully',
                    severity: 'success',
                }),
            );
            onClose();
        }
    }, [isUpdating, isUpdateError, isUpdatedSuccess, updateError, dispatch]);
    console.log('edit modal', id);
    console.log('edit  status', status);
    console.log('edit data', initialData);
      const onSubmit = async () => {
        // If no changes were made, show a message and exit
        if (initialData.statusId == status) {
          dispatch(
            setSnackbar({
              open: true,
              message: 'No changes made.',
              severity: 'info',
            }),
          );
          return;
        }
        // Submit update form
        await updateData({ id, statusId : status }).unwrap();
      };

    // Handles closing the modal.
    //  Resets the form state and calls the onClose callback function.
    const handleClose = () => {
        onClose();
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Update Attendance</DialogTitle>
            <IconButton
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <X />
            </IconButton>
            <DialogContent dividers>
                <Box sx={{ ...textFieldGap, width: '100%' }}>

                </Box>
                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="50vh"
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {fields.map((field, index) => (
                            field.name == 'statusId' ?
                                <Box key={field.name + index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        Status
                                    </Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                :
                                <Box
                                    key={field.name + index}
                                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                                >
                                    <Typography variant="body2" fontWeight="bold">
                                        {field.label}{' '}
                                        {field.required && (
                                            <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                                        )}
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type={'text'}
                                        disabled={true}
                                        value={initialData?.[field.name] || ''}
                                    />
                                </Box>
                        ))}
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={handleClose} size="small">
                    Cancel
                </StyledButton>
                <StyledButton
                    onClick={onSubmit}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={isUpdating || isLoading}
                >
                    {isUpdating ? 'Updating...' : 'Update'}
                </StyledButton>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default EditAttendanceModal;
// STYLES
const textFieldGap = {
    display: 'flex',
    gap: 0.5,
    flexDirection: 'column',
    marginBottom: { xs: '12px', sm: 3 },
};