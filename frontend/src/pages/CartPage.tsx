import React from 'react';
import { Product } from '../models/Product';
import Cart from '../components/Cart';

interface CartPageProps {
  cart: Product[];
  onRemoveFromCart: (product: Product) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onRemoveFromCart }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <Cart cart={cart} onRemoveFromCart={onRemoveFromCart} />
    </div>
  );
};

export default CartPage;
