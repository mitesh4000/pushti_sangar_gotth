import React from "react";
import EcommerceAllProducts from "./EcommerceAllProducts";
import EcommerceNewAddProduct from "./EcommerceNewAddProduct";

const Products = () => {
  return (
    <React.Fragment>
      <EcommerceAllProducts></EcommerceAllProducts>
      <EcommerceNewAddProduct></EcommerceNewAddProduct>
    </React.Fragment>
  );
};

export default Products;
