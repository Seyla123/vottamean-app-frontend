import React, { useEffect } from 'react';
import { useCancelPaymentIntentMutation } from '../../services/paymentApi';
import { useGetUserProfileQuery } from '../../services/userApi';
import StyledButton from '../../components/common/StyledMuiButton';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';
function CancelSubscription({ adminId }) {
  const dispatch = useDispatch();

  const [cancelPaymentIntent, { isLoading, isSuccess, isError, error}] =
    useCancelPaymentIntentMutation();
  const {refetch} = useGetUserProfileQuery();

  useEffect(() => {
    if(isSuccess){
      dispatch(setSnackbar({ open: true, message: 'Subscription cancelled successfully', severity: 'success' }));
      refetch();
    }else if(isError){
      dispatch(setSnackbar({ open: true, message: error?.data?.message || 'Failed to cancel subscription', severity: 'error' }));
    }
  },[isSuccess, isError, error, dispatch]);
  const handleCancel = async () => {
      // Pass adminId as an argument
      await cancelPaymentIntent({ admin_id: adminId }).unwrap();
  };

  return (
     <>
      <StyledButton disabled={isLoading} color="error" variant="outlined" type="submit" size="small" onClick={handleCancel}>
        {isLoading ? 'Canceling...' : 'Cancel Subscription'}
      </StyledButton>
     </>
  );
}

export default CancelSubscription;
