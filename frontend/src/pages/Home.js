import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    (async ()=>{
      const res = await api.get('/products');
      setProducts(res.data.products || []);
    })();
  },[]);
  return (
    <div>
      <h2>Products</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)', gap:10}}>
        {products.map(p=> (
          <div key={p._id} style={{border:'1px solid #ddd', padding:10}}>
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>₹ {p.price}</p>
            <Link to={'/product/'+p._id}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
