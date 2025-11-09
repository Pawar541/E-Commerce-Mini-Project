import React from 'react';
import { Link } from 'react-router-dom';
export default function AdminDashboard(){
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{display:'flex',gap:10}}>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </div>
      <div style={{marginTop:20}}>
        <p>KPIs (placeholder): Total Orders, Pending Orders, Total Revenue, Total Products</p>
      </div>
    </div>
  );
}
