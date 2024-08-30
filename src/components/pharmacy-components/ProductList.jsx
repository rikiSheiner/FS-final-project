import React from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/pharmacy-styles/ProductList.module.css";

const ProductList = ({ products, prescriptions }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.MedicineID}
            MedicineID={product.MedicineID}
            Name={product.Name}
            ImagePath={product.ImagePath}
            Price={product.Price}
            hasPrescription={prescriptions ? prescriptions[product.MedicineID] : true} // Default to true if no prescriptions are passed
          />
        );
      })}
    </div>
  );
};

export default ProductList;
