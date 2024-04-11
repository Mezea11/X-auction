import PostProductForm from "./PostProductForm.jsx";
import { useState } from "react";

export default function PostProductModal({ closeModal }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const postProduct = async (
    title,
    description,
    extended_Description,
    category,
    keywords,
    endDate,
    price,
    img_url
  ) => {
    try {
      const parsedPrice = parseInt(price);

      console.log("hello");
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          extended_Description,
          category,
          keywords,
          endDate,
          price: parsedPrice,
          img_url,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post product");
      }

      //fetchAllProducts();
    } catch (error) {
      console.error("Error posting product:", error);
    }
    setIsSuccess(true);
  };
  return (
    <>
      <div
        className="modal"
        id="PostProductModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Post Product</h5>
              <button
                style={{ marginLeft: "auto" }}
                type="button"
                className="close btn btn-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <PostProductForm onSubmit={postProduct} />
              {isSuccess && (
                <p
                  style={{
                    color: "green",
                    marginTop: "1rem",
                  }}
                >
                  Post successful!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
