'use client';

import { useEffect } from 'react';
import { useCartStore, useQuantityStore } from '@/lib/store';
import { Button } from "@/components/ui/button";
import QuantitySelect from "@/components/QuantitySelect";
import { useRouter } from 'next/navigation';

const AddToCartButton = ({ product, initialCartItems }) => {
  const {quantity} = useQuantityStore()
  const { setItems, addItem } = useCartStore();
  const router = useRouter()

  useEffect(() => {
    setItems(initialCartItems);
  }, []);

  const handleAddToCart = async () => {
    addItem({ ...product, quantity });

    await fetch('/api/update-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        action: 'add', 
        item: { ...product, quantity } 
      }),
    });
    router.refresh()
  };

  return (
    <div>
      <div className="mb-6 mt-4">
        <h2 className="font-semibold mb-2">Adet</h2>
        <QuantitySelect />
      </div>
      <Button className="w-full py-6" onClick={handleAddToCart}>
        Sepete Ekle
      </Button>
    </div>
  );
};

export default AddToCartButton;