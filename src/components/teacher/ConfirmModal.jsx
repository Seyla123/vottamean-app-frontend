import {
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    Stack,
    Typography,
    Alert,
    Box,
    Grid
} from '@mui/material';
import { X } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';
import { BootstrapDialog } from '../common/BootstrapDialog';

/**
 * ConfirmModal
 * 
 * This component renders a modal dialog that is shown when a teacher tries to mark attendance for a class that has already been marked for the current day.
 * 
 * It displays a message explaining that attendance has already been marked for the class and provides a close button to dismiss the dialog.
 * 
 * To use this component, simply import it and call it with the open and onClose props:
 * 
 * import ConfirmModal from './ConfirmModal';
 * 
 * const MyComponent = () => {
 *   const [open, setOpen] = useState(false);
 * 
 *   const handleOpen = () => {
 *     setOpen(true);
 *   };
 * 
 *   const handleClose = () => {
 *     setOpen(false);
 *   };
 * 
 *   return (
 *     <div>
 *       <Button onClick={handleOpen}>Open Class Marked Modal</Button>
 *       <ConfirmModal open={open} onClose={handleClose} />
 *     </div>
 *   );
 * };
 * 
 * @param {object} props The component props
 * @param {boolean} props.open Whether the dialog is open
 * @param {function} props.onClose The function to call when the dialog is closed
 * */

const ConfirmModal = ({ open, onClose, onConfirm, type, isLoading }) => {
    const deactiveConfirm = {
        title: "Deactivate This Account?",
        body:"Are you sure you want to deactivate this teacher account?",
        description: "Deactivating will prevent the teacher from using the platform until an admin restores access."
    }
    const activeConfirm = {
        title: "Activate This Account?",
        body:"Are you sure you want to activate this teacher account?",
        description: "Activating this account will restore the teacher’s ability to log in and access platform features"
    }
    const resendVerificationConfirm = {
        title: "Resend Verification Email?",
        body: "Are you sure you want to resend the verification email to this teacher?",
        description: "Resending the email will ensure the teacher receives the necessary information to verify their account."
    }

    return (
        <BootstrapDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            aria-labelledby="class-marked-dialog-title"
        >
            <DialogTitle id="class-marked-dialog-title">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                     {type === 'deactivate'
                            ? deactiveConfirm.title
                            : type === 'activate'
                            ? activeConfirm.title
                            : resendVerificationConfirm.title}
                </Box>
            </DialogTitle>
            <IconButton
                onClick={onClose}
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
                <Stack justifyContent={'center'} gap={2}>
                    <Typography variant='body1'>
                    {type === 'deactivate'
                            ? deactiveConfirm.body
                            : type === 'activate'
                            ? activeConfirm.body
                            : resendVerificationConfirm.body}
                    </Typography>
                    <Alert severity={type === 'deactivate' ? 'warning' : 'info'}>
                        {type === 'deactivate'
                            ? deactiveConfirm.description
                            : type === 'activate'
                            ? activeConfirm.description
                            : resendVerificationConfirm.description}
                    </Alert>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
                    >
                        <StyledButton
                            size="small"
                            onClick={onClose}
                            variant="text"
                            fullWidth
                        >
                            Cancel
                        </StyledButton>
                        {type === 'deactivate' ? 
                        <StyledButton
                            onClick={onConfirm}
                            size="small"
                            color='error'
                            variant="contained"
                            fullWidth
                            autoFocus
                            disabled={isLoading}
                        >
                          {isLoading ? 'Deactivating': 'Deactivate'}
                        </StyledButton>
                        :
                        <StyledButton
                            onClick={onConfirm}
                            size="small"
                            variant="contained"
                            fullWidth
                            autoFocus
                            disabled={isLoading}
                        >
                            {type === 'activate' ? isLoading ? 'Activating': 'Activate' : isLoading ? 'Resending': 'Resend'}
                        </StyledButton>

                    }
                    </Grid>
                </Grid>
            </DialogActions>
        </BootstrapDialog>
    );
};
export default ConfirmModal
