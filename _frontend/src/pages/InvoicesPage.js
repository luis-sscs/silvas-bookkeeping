import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice } from '../features/invoices/invoicesSlice';

function InvoicesPage() {
  const dispatch = useDispatch();
  const { items: invoices, loading, error } = useSelector((state) => state.invoices);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    status: 'draft',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    description: ''
  });

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingInvoice) {
      dispatch(updateInvoice({ id: editingInvoice.id, data: formData }));
    } else {
      dispatch(createInvoice(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      amount: invoice.amount,
      status: invoice.status,
      issueDate: invoice.issueDate.split('T')[0],
      dueDate: invoice.dueDate.split('T')[0],
      description: invoice.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      dispatch(deleteInvoice(id));
    }
  };

  const resetForm = () => {
    setEditingInvoice(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      amount: '',
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      description: ''
    });
  };

  if (loading) return <div className="loading">Loading invoices...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Invoices</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          New Invoice
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.clientName}</td>
                <td>{invoice.clientEmail}</td>
                <td>${parseFloat(invoice.amount || 0).toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td>{new Date(invoice.issueDate).toLocaleDateString()}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(invoice)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(invoice.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingInvoice ? 'Edit Invoice' : 'New Invoice'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Client Email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="actions">
                <button type="submit" className="btn btn-primary">
                  {editingInvoice ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoicesPage;
