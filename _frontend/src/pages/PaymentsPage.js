import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments } from '../features/payments/paymentsSlice';

function PaymentsPage() {
  const dispatch = useDispatch();
  const { items: payments, loading, error } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading payments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h1>Payments</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Payment #</th>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.paymentNumber}</td>
                <td>{payment.invoiceId}</td>
                <td>${parseFloat(payment.amount || 0).toFixed(2)}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.status}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsPage;
