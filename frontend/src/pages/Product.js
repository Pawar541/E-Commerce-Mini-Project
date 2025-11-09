import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function Product(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(()=>{
    (async ()=>{
      const res = await api.get('/products/' + id);
      setProduct(res.data);
    })();
  },[id]);
  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₹ {product.price}</p>
    </div>
  );
}
