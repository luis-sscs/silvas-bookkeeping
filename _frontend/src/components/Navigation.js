import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <ul>
        <li><Link to="/" style={{ color: isActive('/') ? '#007bff' : 'white' }}>Dashboard</Link></li>
        <li><Link to="/invoices" style={{ color: isActive('/invoices') ? '#007bff' : 'white' }}>Invoices</Link></li>
        <li><Link to="/customers" style={{ color: isActive('/customers') ? '#007bff' : 'white' }}>Customers</Link></li>
        <li><Link to="/products" style={{ color: isActive('/products') ? '#007bff' : 'white' }}>Products</Link></li>
        <li><Link to="/estimates" style={{ color: isActive('/estimates') ? '#007bff' : 'white' }}>Estimates</Link></li>
        <li><Link to="/expenses" style={{ color: isActive('/expenses') ? '#007bff' : 'white' }}>Expenses</Link></li>
        <li><Link to="/payments" style={{ color: isActive('/payments') ? '#007bff' : 'white' }}>Payments</Link></li>
        <li><Link to="/reports" style={{ color: isActive('/reports') ? '#007bff' : 'white' }}>Reports</Link></li>
        <li style={{ marginLeft: 'auto' }}>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '5px 15px' }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
