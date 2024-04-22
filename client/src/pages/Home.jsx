import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  // create variables that contain useState to fetch product objects
  const [products, setProducts] = useState([]);

  //const {products} = useContext(GlobalContext);

  // on window load and whenever state changes, fetch json data
  useEffect(() => {
    fetchAllProducts();
  }, []); //dependency array, with out it useEffect won't stop running

  const fetchAllProducts = async () => {
    try {
      //get data from json-server at db.json
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    console.log(products);
  };

  // this is an early return: make sure there are products to render; if not, abort
  if (!products.length) {
    return null;
  }

  const handleViewProduct = async (productId) => {
    console.log("handle view product");
    // Fetch individual product data
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Error fetching product");
      }
      const productData = await response.json();
      // Now you have the product data, you can navigate to the product page
      console.log("Product data:", productData);
    } catch (error) {
      console.log("error");
      console.error("Error fetching product:", error);
    }
  };
  return (
    <>
      <div id="home-card-container">
        {/* Render our search bar component */}
        <div className="searchbar-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/searchPage")}
          >
            Search for products
          </button>
        </div>

        <section id="homepage-products-container">
          {/* goes through products array and renders each object (product) on page */}
          {products.map((product) => (
            // key links the element to the specific object
            <div
              className="card"
              style={{
                overflow: "hidden",
              }}
              key={product._id}
            >
              <img
                src={product.img_url}
                style={{
                  width: "100%",
                  height: "15rem",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.productname}</h5>
                <p className="card-text">{product.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Starting price:{" "}
                  <strong style={{ color: "green" }}>{product.price}:-</strong>
                </li>
                <li className="list-group-item">
                  Highest bid:{" "}
                  <strong style={{ color: "darkgreen" }}>
                    {product.bid ? product.bid.bid : "No bids"}
                    {product.bid ? ":-" : ""}
                  </strong>
                </li>
                <li className="list-group-item">
                  End date:{" "}
                  <strong style={{ color: "red" }}>{product.endDate}</strong>
                </li>
              </ul>
              <div className="card-body" id="home-card-btn">
                <Link to={`productpage/${product._id}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleViewProduct(product._id)}
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Home;
