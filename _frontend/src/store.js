import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import invoicesReducer from './features/invoices/invoicesSlice';
import customersReducer from './features/customers/customersSlice';
import productsReducer from './features/products/productsSlice';
import estimatesReducer from './features/estimates/estimatesSlice';
import expensesReducer from './features/expenses/expensesSlice';
import paymentsReducer from './features/payments/paymentsSlice';
import reportsReducer from './features/reports/reportsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
    customers: customersReducer,
    products: productsReducer,
    estimates: estimatesReducer,
    expenses: expensesReducer,
    payments: paymentsReducer,
    reports: reportsReducer
  }
});
