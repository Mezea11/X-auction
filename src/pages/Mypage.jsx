import "./Mypage.css";
import PostProductButton from "../components/PostProductButton.jsx";
import { useEffect, useState } from "react";
import MyAuctionObjectsList from "../components/MyAuctionObjectsList.jsx";

export default function Mypage() {
  const [products, setProducts] = useState("");

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

  const [users, setUsers] = useState("");

  useEffect(() => {
    fetchUserById("6049fa70-900f-4d34-87a7-55f06da0558f");
  }, []); //dependency array, with out it useEffect won't stop running

  async function fetchUserById(id) {
    try {
      //get user data from json-server at db.json
      const response = await fetch(`http://localhost:3000/users/${id}`);
      if (!response.ok) {
        throw new Error("error");
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    console.log(users);
  }
  //deletes one product by id
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${"api/products"}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchAllProducts(); //displays all products anew after specific product has been removed
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // this is an early return: make sure there are products to render; if not, abort
  if (!products.length) {
    return null;
  }

  return (
    <>
      <div id="mypage-container">
        <section id="user-info">
          <div className="card border-secondary mb-3" id="mypage-card">
            <div className="card-header">Welcome to My Page</div>
            <div className="card-body text-secondary">
              <p className="card-text">
                You are signed in as: {users.username}
              </p>
            </div>
          </div>
          {/* button-component which in turns triggers the modal for posting a products to show */}
          <PostProductButton />
        </section>
      </div>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My auction ads</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          <MyAuctionObjectsList
            products={products}
            deleteProduct={deleteProduct}
          />
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My active bids</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          {products.length > 0 && (
            <div
              className="card"
              style={{
                minHeight: "min-content",
                minWidth: "18rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={products[5].img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{products[5].title}</h5>
                <p className="card-text">{products[5].description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>
                      Asking price:{" "}
                      <strong style={{ color: "green" }}>
                        {products[5].price}:-
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    Highest bid:{" "}
                    <strong style={{ color: "green" }}>
                      {products[5].highest_bid}:-
                    </strong>
                  </li>
                  <li className="list-group-item">
                    Time left:{" "}
                    <strong style={{ color: "red" }}>
                      {products[5].endDate}
                    </strong>
                  </li>
                </ul>
                <div className="card-body" id="home-card-btn">
                  <button type="button" className="btn btn-primary">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          )}
        
          {products.length > 0 && (
            <div
              className="card"
              style={{
                minHeight: "min-content",
                minWidth: "18rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={products[6].img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{products[6].title}</h5>
                <p className="card-text">{products[6].description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>
                      Asking price:{" "}
                      <strong style={{ color: "green" }}>
                        {products[6].price}:-
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    Highest bid:{" "}
                    <strong style={{ color: "green" }}>
                      {products[6].highest_bid}:-
                    </strong>
                  </li>
                  <li className="list-group-item">
                    Time left:{" "}
                    <strong style={{ color: "red" }}>
                      {products[6].endDate}
                    </strong>
                  </li>
                </ul>
                <div className="card-body" id="home-card-btn">
                  <button type="button" className="btn btn-primary">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mypage-sections">
        <h1 className="section-titles-mypage">My won auctions</h1>
        <div className="ads-card-container-mypage" style={{ display: "flex" }}>
          {products.length > 0 && (
            <div
              className="card"
              style={{
                minHeight: "min-content",
                minWidth: "18rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={products[7].img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{products[7].title}</h5>
                <p className="card-text">{products[7].description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>
                      Asking price:{" "}
                      <strong style={{ color: "green" }}>
                        {products[7].price}:-
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    Highest bid:{" "}
                    <strong style={{ color: "green" }}>
                      {products[7].highest_bid}:-
                    </strong>
                  </li>
                  <li className="list-group-item">
                    Time left:{" "}
                    <strong style={{ color: "red" }}>
                      {products[7].endDate}
                    </strong>
                  </li>
                </ul>
                <div className="card-body" id="home-card-btn">
                  <button type="button" className="btn btn-primary">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          )}
        
          {products.length > 0 && (
            <div
              className="card"
              style={{
                minHeight: "min-content",
                minWidth: "18rem",
                maxWidth: "18rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={products[9].img_url}
                style={{ width: "100%", height: "15rem", objectFit: "cover" }}
                alt="Product Image"
              />
              <div className="card-body">
                <h5 className="card-title">{products[0].title}</h5>
                <p className="card-text">{products[0].description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <p>
                      Asking price:{" "}
                      <strong style={{ color: "green" }}>
                        {products[9].price}:-
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    Highest bid:{" "}
                    <strong style={{ color: "green" }}>
                      {products[9].highest_bid}:-
                    </strong>
                  </li>
                  <li className="list-group-item">
                    Time left:{" "}
                    <strong style={{ color: "red" }}>
                      {products[9].endDate}
                    </strong>
                  </li>
                </ul>
                <div className="card-body" id="home-card-btn">
                  <button type="button" className="btn btn-primary">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mypage-sections" id="bid-history-section">
        <h1 id="bid-history-title">My bid history</h1>
        <div>
          <p>
            “Product”, Price: 255 kr, Date: 2024-03-19 13:15, Final price: 500 k
          </p>
        </div>
      </section>
    </>
  );
}
