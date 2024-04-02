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
    <>
      <div id="product-page-container">
        <>
          <div className="card mb-3">
            <img src={product.img_url} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p>{product.description}</p>
              <p className="card-text">{product.extended_Description}</p>
              <p className="card-text">Highest bid: {product.price}</p>
              <button
                type="button"
                className="btn btn-primary"
                id="product-page-button"
              >
                Place Bid
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default ProductPageComponent;
