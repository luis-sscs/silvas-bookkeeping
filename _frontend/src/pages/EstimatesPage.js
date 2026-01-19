import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEstimates, createEstimate, updateEstimate, deleteEstimate } from '../features/estimates/estimatesSlice';

function EstimatesPage() {
  const dispatch = useDispatch();
  const { items: estimates, loading, error } = useSelector((state) => state.estimates);
  const [showModal, setShowModal] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    status: 'draft',
    issueDate: new Date().toISOString().split('T')[0],
    validUntil: '',
    description: ''
  });

  useEffect(() => {
    dispatch(fetchEstimates());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEstimate) {
      dispatch(updateEstimate({ id: editingEstimate.id, data: formData }));
    } else {
      dispatch(createEstimate(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (estimate) => {
    setEditingEstimate(estimate);
    setFormData({
      clientName: estimate.clientName,
      clientEmail: estimate.clientEmail,
      amount: estimate.amount,
      status: estimate.status,
      issueDate: estimate.issueDate.split('T')[0],
      validUntil: estimate.validUntil.split('T')[0],
      description: estimate.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      dispatch(deleteEstimate(id));
    }
  };

  const resetForm = () => {
    setEditingEstimate(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      amount: '',
      status: 'draft',
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: '',
      description: ''
    });
  };

  if (loading) return <div className="loading">Loading estimates...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Estimates</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          New Estimate
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Estimate #</th>
              <th>Client</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Valid Until</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate) => (
              <tr key={estimate.id}>
                <td>{estimate.estimateNumber}</td>
                <td>{estimate.clientName}</td>
                <td>{estimate.clientEmail}</td>
                <td>${parseFloat(estimate.amount || 0).toFixed(2)}</td>
                <td>{estimate.status}</td>
                <td>{new Date(estimate.issueDate).toLocaleDateString()}</td>
                <td>{new Date(estimate.validUntil).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(estimate)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(estimate.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingEstimate ? 'Edit Estimate' : 'New Estimate'}</h2>
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
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
                <label>Valid Until</label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
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
                  {editingEstimate ? 'Update' : 'Create'}
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

export default EstimatesPage;
