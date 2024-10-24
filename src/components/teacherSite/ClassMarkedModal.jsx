/*************  ✨ Codeium Command 🌟  *************/
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
                        Attendance for this class has already been marked for today. please contact to your administrator for any questions, .
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