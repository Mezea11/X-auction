import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  // create variables that contain useState to fetch product objects
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
    const interval = setInterval(fetchAllProducts, 5000);
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); //Empty dependency array to prevent infinite loop

  const fetchAllProducts = async () => {
    try {
      //get data from json-server at db.json
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();

      // Filter data from json server: Checks if object: "onngoing" is true or false
      const ongoingProducts = data.filter((product) => product.ongoing);

      // Update the state with filtered products
      setProducts(ongoingProducts);

      //Error handling
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // this is an early return: make sure there are products to render; if not, abort
  if (!products.length) {
    return null;
  }

  // Sends user to productpage with proudctId
  const handleViewProduct = async (productId) => {
    try {
      // Fetch product by ID
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Error fetching product");
      }
      // Store response in const and turn into JSON format
      const productData = await response.json();
      console.log("Product data:", productData);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <div id="home-card-container">
        <div className="searchbar-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/searchPage")}
          >
            Search for products
          </button>
        </div>
        <section id="homepage-slogan-container">
          <div className="jumbotron text-center" id="homepage-jumbo">
            <h1>X-Auction</h1>
            <p>Your trusted auction for all things extreme.</p>
          </div>
        </section>
        <section id="homepage-products-container">
          {/* goes through products array and renders each object (product) on page */}
          {products.map((product) => (
            // key links the element to the specific object
            <div className="card" key={product._id}>
              <img
                src={product.img_url}
                style={{
                  width: "100%",
                  height: "25%",
                  objectFit: "cover",
                }}
              />
              <div className="card-body" id="card-body">
                <h5 className="card-title">{product.productname}</h5>
                <p className="card-text" id="card-description">
                  {product.description}
                </p>
              </div>
              <ul className="list-group list-group-flush" id="card-prices">
                <li className="list-group-item">
                  Starting price:{" "}
                  <strong style={{ color: "green" }}>
                    {product.starting_price} kr
                  </strong>
                </li>
                <li className="list-group-item">
                  Highest bid:{" "}
                  <strong style={{ color: "darkgreen" }}>
                    {product.bids.length > 0
                      ? product.bids[product.bids.length - 1].bid + " kr"
                      : "No bids"}
                  </strong>
                </li>
                <li className="list-group-item" id="end-date-li">
                  End date:{" "}
                  <strong style={{ color: "red" }}>
                    {new Date(product.end_dateTime).toLocaleString(undefined, {
                      hour12: false,
                      hourCycle: "h23",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </strong>
                </li>
              </ul>
              <div className="card-body" id="home-card-btn-container">
                <Link to={`productpage/${product._id}`}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleViewProduct(product._id)}
                    id="home-card-btn"
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
