import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from '../features/expenses/expensesSlice';

function ExpensesPage() {
  const dispatch = useDispatch();
  const { items: expenses, loading, error } = useSelector((state) => state.expenses);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    vendor: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      dispatch(updateExpense({ id: editingExpense.id, data: formData }));
    } else {
      dispatch(createExpense(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      category: expense.category,
      vendor: expense.vendor,
      amount: expense.amount,
      date: expense.date.split('T')[0],
      description: expense.description || '',
      status: expense.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(id));
    }
  };

  const resetForm = () => {
    setEditingExpense(null);
    setFormData({
      category: '',
      vendor: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      status: 'pending'
    });
  };

  if (loading) return <div className="loading">Loading expenses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Expenses</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          New Expense
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.category}</td>
                <td>{expense.vendor}</td>
                <td>${parseFloat(expense.amount || 0).toFixed(2)}</td>
                <td>{expense.status}</td>
                <td>{expense.description}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(expense)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingExpense ? 'Edit Expense' : 'New Expense'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Vendor</label>
                <input
                  type="text"
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
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
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
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
                  {editingExpense ? 'Update' : 'Create'}
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

export default ExpensesPage;
