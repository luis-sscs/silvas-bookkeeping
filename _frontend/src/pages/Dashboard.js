import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '../features/invoices/invoicesSlice';
import { fetchCustomers } from '../features/customers/customersSlice';
import { fetchProducts } from '../features/products/productsSlice';
import { fetchExpenses } from '../features/expenses/expensesSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { items: invoices } = useSelector((state) => state.invoices);
  const { items: customers } = useSelector((state) => state.customers);
  const { items: products } = useSelector((state) => state.products);
  const { items: expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
    dispatch(fetchExpenses());
  }, [dispatch]);

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

  const pendingInvoices = invoices.filter(inv => inv.status === 'sent' || inv.status === 'draft').length;
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h3>Total Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="card">
          <h3>Customers</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
            {customers.length}
          </p>
        </div>
        <div className="card">
          <h3>Pending Invoices</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
            {pendingInvoices}
          </p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545' }}>
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="card">
          <h3>Products</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6c757d' }}>
            {products.length}
          </p>
        </div>
        <div className="card">
          <h3>Net Profit</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: totalRevenue - totalExpenses >= 0 ? '#28a745' : '#dc3545' }}>
            ${(totalRevenue - totalExpenses).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Recent Invoices</h3>
        {invoices.length === 0 ? (
          <p>No invoices yet</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.clientName}</td>
                  <td>${parseFloat(invoice.amount || 0).toFixed(2)}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: invoice.status === 'paid' ? '#d4edda' : invoice.status === 'sent' ? '#fff3cd' : '#f8d7da',
                      color: invoice.status === 'paid' ? '#155724' : invoice.status === 'sent' ? '#856404' : '#721c24'
                    }}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
