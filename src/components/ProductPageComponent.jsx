import "./ProductPageComponent.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceBidButton from "./PlaceBidButton";

function ProductPageComponent() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
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

  // Find the highest bid
  const highestBid = product.bid
    ? Math.max(...product.bid.map((b) => b.bid))
    : null;

  return (
    <>
      <div id="product-page-container">
        <>
          <div className="card mb-3" id="product-page-card">
            <img
              src={product.img_url}
              className="card-img-top"
              alt="..."
              id="product-image"
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h6>{product.description}</h6>
              <p className="card-text" id="product-page-extended-description">
                {product.extended_Description}
              </p>
              <p className="card-text">
                Asking price:{" "}
                <strong style={{ color: "green" }}>{product.price} kr</strong>
              </p>
              <p className="card-text">
                Highest bid:{" "}
                <strong style={{ color: "darkgreen" }}>
                  {highestBid ? `${highestBid} kr` : "No bids"}
                </strong>
              </p>
              <p>
                End date:{" "}
                <strong style={{ color: "red" }}>{product.endDate}</strong>
              </p>
              <PlaceBidButton />
            </div>
          </div>
        </>
      </div>
      <div id="bid-history-container">
        <div className="card" style={{ width: "18rem" }} id="bid-history-card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Bid history:</li>
            {product.bid && product.bid.length > 0 && (
              <li className="list-group-item">
                <strong style={{ color: "darkgreen" }}>{highestBid} kr</strong>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductPageComponent;
