import { useEffect, useState, useContext } from "react";
import PatchProductForm from "./PatchProductForm.jsx";
import { GlobalContext } from "../GlobalContext";

export default function PatchProductModal({ closeModal }) {
  const { user } = useContext(GlobalContext);
  // const seller = {user.username}; // Set the userId
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
      const response = await fetch(`/api/products?seller=${user.username}`);
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
      if (
        selectedProduct &&
        formData.starting_price == selectedProduct.starting_price
      ) {
        delete formData.starting_price;
      }

      const response = await fetch(`/api/products/${selectedProductId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to patch product");
      }

      setIsSuccess(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error patching product:", error);
      setIsSuccess(false); // Reset success state

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Error message from the backend response
      } else {
        setErrorMessage(
          error.message || "Failed to patch product. Please try again."
        ); 
      }
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
                className="form-control w-75"
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
