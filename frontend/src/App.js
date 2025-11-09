import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App(){
  return (
    <div style={{padding:20}}>
      <header style={{display:'flex', gap:10, marginBottom:20}}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/admin/login">Admin</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
