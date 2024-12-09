import React from 'react';
import { Product } from '../models/Product';
import ProductList from '../components/ProductList';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const Products: React.FC<ProductsPageProps> = ({ products, onAddToCart }) => {
  return (
    <div>
      <h2>Products</h2>
      <ProductList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Products;
