import React from "react";

const ProductList = ({ products }) => {
  return (
    <>
      <div>
        {products.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
