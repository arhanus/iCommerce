"use client"
import { useCartStore } from '@/lib/store';
import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {useRouter} from 'next/navigation';
import Image from 'next/image';

const calculateTotal = (cartItems) => {
  let toplam = 0;
  for (let index = 0; index < cartItems.length; index++) {
    toplam += (cartItems[index].price*cartItems[index].quantity);  
  }
  return parseFloat(toplam.toFixed(2));
}

export default function Cart({cartItems}) {
  let toplam = calculateTotal(cartItems)
  
  const router = useRouter()
  
  const { removeItem, updateQuantity } = useCartStore();

  const handleRemoveItem = async (id) => {
    removeItem(id);
    await fetch('/api/update-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', item: { id } }),
    });
    router.refresh()
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    updateQuantity(id, newQuantity);
    await fetch('/api/update-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', item: { id, quantity: newQuantity } }),
    });
    router.refresh()
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between"><h1 className="text-2xl font-bold mb-4">Sepetim</h1><span className="font-semibold text-lg">Toplam: {toplam}₺</span></div>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center items-center justify-center gap-4">

              <div className="flex gap-4 items-center">              
                <div className="w-24 h-24 relative">
                <Image src="/product.jpg" fill className="object-cover rounded-md" alt=""/>
              </div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Fiyat: {item.price}₺</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="bg-blue-600 text-white rounded mr-2 px-4 py-1 hover:bg-blue-500 duration-150"
                >
                  -
                </button>
                <span className="font-bold">{item.quantity} Adet</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-blue-600 text-white rounded ml-2 mr-4 px-4 py-1 hover:bg-blue-500 duration-150"
                >
                  +
                </button>

                
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500 duration-150"
                >
                  Kaldır
                </button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {cartItems.length !== 0 && <Button className="w-full py-6">Alışverişi Tamamla</Button>} 
   </div>
  );
}