import React from 'react';
import { Product } from '../models/Product';

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  return (
    <div key={product.id} style={{ border: "1px solid #ddd", padding: "16px", textAlign: "center" }}>
    <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
    <h3>{product.name}</h3>
    <p>${product.price.toFixed(2)}</p>
    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
  </div>
  );
};

export default ProductItem;
