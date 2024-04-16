import { useEffect, useState } from "react";
import PatchProductForm from "./PatchProductForm.jsx";

export default function PatchProductModal({ closeModal }) {
  const seller = "kalleboll"; // Set the userId
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // State variable to store the selected product
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProductsByseller();
  }, []); // Fetch products when userId changes

  const fetchProductsByseller = async () => {
    try {
      const response = await fetch(`/api/products?seller=${seller}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    const selectedProductData = products.find(
      (product) => product._id === productId
    );
    setSelectedProduct(selectedProductData); // Update selected product data
  };

  const patchProduct = async (formData) => {
    try {
      formData.price = parseFloat(formData.price);

      const response = await fetch(`/api/products/${selectedProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to patch product");
      }

      setIsSuccess(true);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error patching product:", error);
      setIsSuccess(false); // Reset success state
      setErrorMessage("Failed to patch product. Please try again."); // Set error message
    }
  };

  return (
    <>
      <div
        className="modal"
        id="patchProductModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ flexDirection: "column" }}>
              <h5 className="modal-title">Patch Product</h5>
              <button
                style={{ alignSelf: "flex-end" }}
                type="button"
                className="close btn btn-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="productSelect">Select Product:</label>
              <select
                id="productSelect"
                className="form-control"
                value={selectedProductId}
                onChange={(e) => handleProductSelect(e.target.value)}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <option key="default" value="">
                  Select a product to patch
                </option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.productname}
                  </option>
                ))}
              </select>
              {/* Pass selectedProduct as initialData prop to PatchProductForm */}
              <PatchProductForm
                onSubmit={patchProduct}
                initialData={selectedProduct}
              />
              {isSuccess && (
                <p
                  style={{
                    color: "green",
                    marginTop: "1rem",
                  }}
                >
                  Update successful!
                </p>
              )}
              {errorMessage && (
                <p
                  style={{
                    color: "red",
                    marginTop: "1rem",
                  }}
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
