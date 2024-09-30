"use client"
import { useQuantityStore } from "@/lib/store"
import { useEffect } from "react";
const QuantitySelect = () => {
    const {quantity, incrementQuantity, decrementQuantity, resetQuantity} = useQuantityStore()
    useEffect(() => {
      resetQuantity();
    }, [resetQuantity]);
  return (
    <>
    <button onClick={() => decrementQuantity()} className="bg-zinc-200 px-4 py-2 rounded-md mr-4 hover:bg-zinc-300 duration-150 font-bold max-w-12">-</button >
    <span className="text-xl font-bold">{quantity}</span>
    <button onClick={() => incrementQuantity()} className="bg-zinc-200 px-4 py-2 rounded-md ml-4 hover:bg-zinc-300 duration-150 font-bold max-w-12">+</button>
    </>
  )
}

export default QuantitySelect