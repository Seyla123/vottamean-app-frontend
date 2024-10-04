import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentSuccessPage() {
  // Access the current location object
  const location = useLocation();

  // Function to extract the session_id from the URL query parameters
  const getSessionId = () => {
    const params = new URLSearchParams(location.search);
    return params.get('session_id');
  };

  // Get the session ID
  const sessionId = getSessionId();

  return (
    <div>
      <h1>Payment Successful!</h1>
      {sessionId ? (
        <p>Your session ID is: {sessionId}</p>
      ) : (
        <p>No session ID found. Please check your payment.</p>
      )}
      {/* You can add additional content here, such as instructions or a link to return to the dashboard */}
    </div>
  );
}

export default PaymentSuccessPage;
