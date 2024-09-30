import Cart from "@/components/Cart"
import { cookies } from "next/headers";
const cartPage = () => {
  const cookieStore = cookies();
  const cartItems = JSON.parse(cookieStore.get('cartItems')?.value || '[]');
  return (
    <div><Cart cartItems={cartItems}/></div>
  )
}

export default cartPage