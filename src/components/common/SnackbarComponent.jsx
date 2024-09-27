import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarAlert from './SnackbarAlert';

function SnackbarComponent() {
  // Get dispatch function from useDispatch hook
  // Get snackbar state from Redux store
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.ui);

  return (
    <>
      {/* Display the SnackbarAlert component */}
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
