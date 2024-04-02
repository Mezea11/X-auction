import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchbarComponent from "../components/Searchbar.jsx";

function Home() {
  // create variables that contain useState to fetch product objects
  const [products, setProducts] = useState([]);

  // on window load and whenever state changes, fetch json data
  useEffect(() => {
    fetchAllProducts();
  }, []); //dependency array, with out it useEffect won't stop running

  const fetchAllProducts = async () => {
    try {
      //get data from json-server at db.json
      const response = await fetch("http://localhost:3000/products");
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

  return (
    <>
      <div id="home-card-container">
        <div className="searchbar-container">
          <SearchbarComponent />
        </div>

        {/* goes through products array and renders each object (product) on page */}
        {products.map((product) => (
          // key links the element to the specific object
          <div className="card" style={{ width: "18rem" }} key={product.id}>
            <img src={product.img_url} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Highest bid:{" "}
                <strong style={{ color: "green" }}>
                  {product.highest_bid}:-
                </strong>
              </li>
              <li className="list-group-item">
                Time left:{" "}
                <strong style={{ color: "red" }}>{product.endDate}</strong>
              </li>
            </ul>
            <div className="card-body" id="home-card-btn">
              <Link to={`/ProductPage/${product.id}`}>
                <button type="button" className="btn btn-primary">
                  View Product
                </button>
              </Link>
              &nbsp;
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
