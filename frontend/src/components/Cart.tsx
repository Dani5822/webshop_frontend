import React from 'react';
import { Product } from '../models/Product';

interface CartProps {
  cart: Product[];
  onRemoveFromCart: (product: Product) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart }) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                {product.name} - ${product.price.toFixed(2)}
              </span>
              
              <button onClick={() => onRemoveFromCart(product)} style={{ marginLeft: '10px', background: 'red' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
