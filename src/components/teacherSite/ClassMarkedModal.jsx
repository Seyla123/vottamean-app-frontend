import {
    DialogTitle,
    IconButton,
    DialogContent,
    DialogActions,
    Stack,
    Typography,
    Alert,
    Box
} from '@mui/material';
import { X } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';
import { BootstrapDialog } from '../common/BootstrapDialog';

/**
 * ClassMarkedModal
 * 
 * This component renders a modal dialog that is shown when a teacher tries to mark attendance for a class that has already been marked for the current day.
 * 
 * It displays a message explaining that attendance has already been marked for the class and provides a close button to dismiss the dialog.
 * 
 * To use this component, simply import it and call it with the open and onClose props:
 * 
 * import ClassMarkedModal from './ClassMarkedModal';
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
 *       <ClassMarkedModal open={open} onClose={handleClose} />
 *     </div>
 *   );
 * };
 * 
 * @param {object} props The component props
 * @param {boolean} props.open Whether the dialog is open
 * @param {function} props.onClose The function to call when the dialog is closed
 * */

const ClassMarkedModal = ({ open, onClose }) => {
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
                    Attendance Already Marked
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
                        You cannot mark attendance for this class again today.
                    </Typography>
                    <Alert severity="warning">
                        Attendance for this class has already been marked for today, please contact to your administrator for any questions.
                    </Alert>
                </Stack>
            </DialogContent>
            <DialogActions>
                <StyledButton
                    size="small"
                    onClick={onClose}
                    variant="text"
                >
                    Close
                </StyledButton>
            </DialogActions>
        </BootstrapDialog>
    );
};
export default ClassMarkedModal
