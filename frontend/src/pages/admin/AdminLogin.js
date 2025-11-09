import React, { useState } from 'react';
import api, { setAuthToken } from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email,setEmail] = useState('admin@example.com');
  const [password,setPassword] = useState('Admin@12345');
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', { email, password });
      const token = res.data.token;
      setAuthToken(token);
      localStorage.setItem('adminToken', token);
      nav('/admin/dashboard');
    } catch (err) { alert('Login failed: ' + (err.response?.data?.message || err.message)); }
  };
  return (
    <div style={{maxWidth:400}}>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <div><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Password</label><input value={password} onChange={e=>setPassword(e.target.value)} type="password" /></div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
