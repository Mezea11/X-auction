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
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
            <img src="..." className="card-img-bottom" alt="..." />
          </div>
        </>

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Highest bid: {product.highest_bid}</p>
        <p>{product.extended_Description}</p>
      </div>
    </>
  );
}

export default ProductPageComponent;
