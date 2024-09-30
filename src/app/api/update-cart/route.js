import { cookies } from 'next/headers';

export async function POST(request) {
  const { action, item } = await request.json();
  const cookieStore = cookies();
  const cartItems = JSON.parse(cookieStore.get('cartItems')?.value || '[]');

  let updatedItems;
  switch (action) {
    case 'add':
      const existingItem = cartItems.find(i => i.id === item.id);
      if (existingItem) {
        updatedItems = cartItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedItems = [...cartItems, { id: item.id, quantity: item.quantity, name: item.name, price: item.price }];
      }
      break;
    case 'remove':
      updatedItems = cartItems.filter(i => i.id !== item.id);

      break;
    case 'update':
      updatedItems = cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: item.quantity } : i
      );

      break;
    default:
      return Response.json({ error: 'Invalid action' }, { status: 400 });
  }

  cookieStore.set('cartItems', JSON.stringify(updatedItems), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 hafta
    path: '/',
  });

  return Response.json({ success: true });
}