import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import InvoicesPage from './pages/InvoicesPage';
import CustomersPage from './pages/CustomersPage';
import ProductsPage from './pages/ProductsPage';
import EstimatesPage from './pages/EstimatesPage';
import ExpensesPage from './pages/ExpensesPage';
import PaymentsPage from './pages/PaymentsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      dispatch(login());
    }
  }, [dispatch, token]);

  if (!token) {
    return <div className="loading">Authenticating with test account...</div>;
  }

  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/estimates" element={<EstimatesPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
