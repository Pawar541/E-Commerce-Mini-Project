import React, { useState } from 'react';
import api from '../api/api';

export default function AdminProductForm({ onCreated }){
  const [name,setName]=useState(''); const [slug,setSlug]=useState(''); const [price,setPrice]=useState(0);
  const submit = async e => {
    e.preventDefault();
    const payload = { name, slug, price: Number(price) };
    const res = await api.post('/admin/products', payload);
    onCreated && onCreated(res.data);
    setName(''); setSlug(''); setPrice(0);
  };
  return (
    <form onSubmit={submit} style={{border:'1px solid #ccc',padding:10}}>
      <h4>Add Product</h4>
      <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
      <div><input placeholder="Slug" value={slug} onChange={e=>setSlug(e.target.value)} /></div>
      <div><input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} /></div>
      <button type="submit">Create</button>
    </form>
  );
}
