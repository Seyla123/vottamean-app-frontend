import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarAlert from './SnackbarAlert';

/**
 * SnackbarComponent - A component that displays a snackbar alert message.
 * 
 * This component is connected to the Redux store and listens for changes to the
 * `ui.snackbar` state. When the state changes, it displays a snackbar alert with
 * the corresponding message and severity.
 */
function SnackbarComponent() {
  // Get dispatch function from useDispatch hook
  const dispatch = useDispatch();
  
  // Get snackbar state from Redux store
  const { snackbar } = useSelector((state) => state.ui);

  return (
    <>
      {/* Display the SnackbarAlert component */}
      {/* Pass the open, handleClose, message, and severity props to the component */}
      <SnackbarAlert
        open={snackbar.open}
        handleClose={() => dispatch(setSnackbar({ open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}

export default SnackbarComponent;
