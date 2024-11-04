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
 * ClassMarkWrongDayModal
 * 
 * This component renders a modal dialog that is shown when a teacher tries to mark attendance for a class that has already been marked for the current day.
 * 
 * It displays a message explaining that attendance has already been marked for the class and provides a close button to dismiss the dialog.
 * 
 * To use this component, simply import it and call it with the open and onClose props:
 * 
 * import ClassMarkWrongDayModal from './ClassMarkWrongDayModal';
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
 *       <ClassMarkWrongDayModal open={open} onClose={handleClose} />
 *     </div>
 *   );
 * };
 * 
 * @param {object} props The component props
 * @param {boolean} props.open Whether the dialog is open
 * @param {function} props.onClose The function to call when the dialog is closed
 * */

const ClassMarkWrongDayModal = ({ open, onClose }) => {
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
                    Attendance Marking Reminder
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
                        Attendance can only be marked for the scheduled day.
                    </Typography>
                    <Alert severity="warning">
                        You cannot mark attendance for this class today, as it is not the scheduled day. Please ensure you are marking attendance on the correct date.
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
export default ClassMarkWrongDayModal
