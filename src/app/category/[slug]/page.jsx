"use client"
import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';

export default function Page({params}) {
  const {slug} = params
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5254/api/Product/get-products-by-subcategory/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} | ${response.status == 404 && "Belirtilen alt kategoride ürün bulunamadı."}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Ürünleri getirirken bir hata oluştu:", error);
        setError(error.message);
      }
    };

    getProducts();
  }, []);

  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="w-full flex flex-col gap-4 pt-6 pb-10">
      {products.length === 0 ? (
        <div className="w-16 h-16 mx-auto mt-20"><Loading/></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      )}
    </div>
  );
}