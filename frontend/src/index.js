import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Home />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='cart' element={<Cart />} />
      </Route>
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/products' element={<AdminProducts />} />
      <Route path='/admin/orders' element={<AdminOrders />} />
    </Routes>
  </BrowserRouter>
);
