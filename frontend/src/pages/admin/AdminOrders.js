import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { setAuthToken } from '../../api/api';

export default function AdminOrders(){
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('adminToken');
  useEffect(()=>{ setAuthToken(token); (async ()=>{ const res = await api.get('/admin/orders'); setOrders(res.data.orders || []); })(); },[token]);
  return (
    <div>
      <h2>Orders</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>OrderID</th><th>User</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.email}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={async ()=>{ const res = await api.get('/admin/orders/'+o._id); alert(JSON.stringify(res.data)); }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
