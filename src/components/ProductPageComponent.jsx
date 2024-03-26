// ProductPageComponent.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Function that GETS product by ID and renders the specific product out on the ProductPage.jsx
function ProductPageComponent() {
  const { productId } = useParams();
  console.log("productId:", productId); // Log the productId
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("productId:", productId); // Log the productId

      try {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Highest bid: {product.highest_bid}</p>
      <p>{product.extended_description}</p>
    </div>
  );
}

export default ProductPageComponent;
