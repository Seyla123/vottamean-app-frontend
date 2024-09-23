import { Snackbar, Alert } from "@mui/material";
import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch, useSelector } from "react-redux";

function SnackbarMessage() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.ui);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={() => dispatch(setSnackbar({ open: false }))}
    >
      <Alert
        onClose={() => dispatch(setSnackbar({ open: false }))}
        severity={snackbar.severity || 'info'} // Provide a default severity
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage;