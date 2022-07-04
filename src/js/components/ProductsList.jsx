import React from "react";
import { ProductCard } from "./ProductCard.jsx";
const ProductsList = (props) => {
  const { products = [], itemToCart = Function.prototype } = props;

  return (
    <main className="products">
      {products.map((item) => (
        <ProductCard key={item.mainId} {...item} itemToCart={itemToCart} />
      ))}
    </main>
  );
};

export { ProductsList };
