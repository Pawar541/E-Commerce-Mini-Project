import React, { useEffect, useState } from 'react';
import api, { setAuthToken } from '../../api/api';
import AdminProductForm from '../../components/AdminProductForm';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem('adminToken');
  useEffect(()=>{ setAuthToken(token); },[token]);
  useEffect(()=>{
    (async ()=>{
      const res = await api.get('/admin/products?page=' + page);
      setProducts(res.data.products || []);
    })();
  },[page]);
  return (
    <div>
      <h2>Products</h2>
      <AdminProductForm onCreated={p=>setProducts([p,...products])} />
      <table border="1" cellPadding="6" style={{width:'100%', marginTop:10}}>
        <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p=> (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={async ()=>{ const res = await api.get('/admin/products/'+p._id); alert(JSON.stringify(res.data)); }}>View</button>
                <button onClick={async ()=>{ await api.delete('/admin/products/'+p._id); setProducts(products.filter(x=>x._id!==p._id)); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
