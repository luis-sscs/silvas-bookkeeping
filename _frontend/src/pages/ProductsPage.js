import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../features/products/productsSlice';

function ProductsPage() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'product',
    description: '',
    price: '',
    sku: '',
    unit: 'unit'
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, data: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      description: product.description || '',
      price: product.price,
      sku: product.sku || '',
      unit: product.unit
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      type: 'product',
      description: '',
      price: '',
      sku: '',
      unit: 'unit'
    });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Products & Services</h1>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          New Product
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.sku}</td>
                <td>${parseFloat(product.price || 0).toFixed(2)}</td>
                <td>{product.unit}</td>
                <td>{product.description}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
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
                  {editingProduct ? 'Update' : 'Create'}
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

export default ProductsPage;
